import { Button } from "../Shared/Button";
import { authService } from "../../services/Auth";
import { useState, useEffect } from "react";
import { submitReview, getUserDetails, deleteReview } from "../../services/Api";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const Reviews = ({ destination }) => {
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5); // Default rating
  const [reviews, setReviews] = useState(destination.reviews || []);
  const [currentUser, setCurrentUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // For handling the delete confirmation state

  // Fetch logged-in user's details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      const jwt = authService.getToken();
      if (jwt) {
        const user = await getUserDetails(jwt);
        setCurrentUser(user);
      }
    };

    fetchUserDetails();
  }, []);

  const handleWriteReviewClick = () => {
    if (authService.isLoggedIn()) {
      setIsReviewing(true);
    } else {
      toast.error("You must be logged in to write a review.");
    }
  };

  const handleStarClick = (star) => {
    setRating(star); // Set the rating based on the clicked star
  };

  const handleReviewSubmit = async () => {
    if (reviewText.trim() === "") {
      toast.warning("Review cannot be empty");
      return;
    }

    const jwt = authService.getToken();
    if (!jwt) {
      toast.error("Authentication error. Please log in again.");
      return;
    }

    try {
      const newReview = await submitReview(
        destination.documentId,
        reviewText,
        rating,
        jwt
      );

      setReviews((prevReviews) => [
        ...prevReviews,
        {
          ...newReview.data,
          user: currentUser?.username || "Anonymous",
        },
      ]);

      setReviewText("");
      setRating(5);
      setIsReviewing(false);
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Could not submit your review. Please try again.");
    }
  };

  // Handle review deletion with confirmation
  const handleDeleteReview = async (documentId) => {
    const jwt = authService.getToken();
    if (!jwt) {
      toast.error("Authentication error. Please log in again.");
      return;
    }

    // Log the documentId when delete is initiated
    console.log("Confirm Deleting review with documentId:", documentId);

    // Check if we are in the confirmation step
    if (confirmDelete === documentId) {
      try {
        const review = reviews.find((r) => r.documentId === documentId);
        if (
          review.users_permissions_user?.documentId !== currentUser?.documentId
        ) {
          toast.warn("You cannot delete reviews that do not belong to you.");
          return;
        }

        await deleteReview(documentId, jwt);
        setReviews(
          reviews.filter((review) => review.documentId !== documentId)
        );
        toast.success("Review deleted successfully.");
        setConfirmDelete(null); // Reset the confirmation state after successful deletion
      } catch (error) {
        console.error("Failed to delete review:", error);
        toast.error("Could not delete your review. Please try again.");
      }
    } else {
      setConfirmDelete(documentId); // Set documentId to prompt confirmation
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null); // Cancel the deletion process
  };

  return (
    <div className="grid grid-cols-3 mt-12 rounded-lg">
      <div className="col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl text-gray-700">Reviews</h3>
          {isReviewing ? (
            <Button
              onClick={handleReviewSubmit}
              text={"Submit"}
              className="bg-blue-500 text-white max-w-[160px] px-4 py-2 rounded hover:bg-blue-600"
            />
          ) : (
            <Button
              onClick={handleWriteReviewClick}
              text={"Write a review"}
              className="bg-white border-2 max-w-[160px] border-black text-black hover:bg-black hover:text-white"
            />
          )}
        </div>

        {/* Review Input */}
        {isReviewing && (
          <div className="mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">
                Rate your stay:
              </label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`material-icons cursor-pointer ${
                      star <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(star)}
                    style={{ fontSize: "30px" }}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>

            <label className="block text-gray-700 mb-2 font-semibold mt-8">
              Message:
            </label>
            <textarea
              value={reviewText}
              rows={5}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
        )}

        {/* Display Reviews */}
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li
                key={index}
                className="border border-gray-100 rounded-lg p-4 mb-4 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="material-icons text-gray-500 bg-gray-200 rounded-full p-2"
                      style={{ fontSize: "20px" }}
                    >
                      person
                    </span>
                    <div className="flex gap-2">
                      <p className="font-semibold text-gray-800">
                        {review.user}
                      </p>
                      <div className="flex items-center text-orange-600">
                        {"★".repeat(review.Rating)}
                        {"☆".repeat(5 - review.Rating)}
                      </div>
                    </div>
                  </div>

                  {/* Display delete button only if the review belongs to the logged-in user */}
                  {currentUser &&
                    review.users_permissions_user?.documentId ===
                      currentUser?.documentId && (
                      <>
                        {/* If we're confirming deletion */}
                        {confirmDelete === review.documentId ? (
                          <div className="flex gap-2">
                            <Button
                              text="Confirm"
                              className="bg-red-500 text-white px-4 py-2 rounded"
                              onClick={() =>
                                handleDeleteReview(review.documentId)
                              }
                            />
                            <Button
                              text="Cancel"
                              className="bg-gray-300 text-black px-4 py-2 rounded"
                              onClick={handleCancelDelete}
                            />
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              handleDeleteReview(review.documentId);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        )}
                      </>
                    )}
                </div>
                <p className="mt-2 text-gray-700">{review.Comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
