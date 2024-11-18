import thailandImg from "../assets/thailand.jpg";
import norwayImg from "../assets/norway.jpg";
import nepalImg from "../assets/nepal.jpg";
import singaporeImg from "../assets/singapore.jpg";
import firstImg from "../assets/first.jpg";
import secondImg from "../assets/second.jpg";
import thirdImg from "../assets/third.jpg";
import heroImg1 from "../assets/couple-with-kids.jpg";
import heroImg2 from "../assets/mountain-trekking.jpg";
import person1 from "../assets/person1.jpg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";

export const heroImages = [
  {
    image: heroImg1,
  },
  {
    image: heroImg2,
  },
];

export const destinations = [
  {
    image: thailandImg,
    location: "Thailand",
    featured: true,
  },
  {
    image: norwayImg,
    location: "Norway",
    featured: true,
  },
  {
    image: nepalImg,
    location: "Nepal",
    featured: true,
  },
  {
    image: singaporeImg,
    location: "Singapore",
    featured: true,
  },
];

export const landmarks = [
  {
    image: firstImg,
  },
  {
    image: secondImg,
  },
  {
    image: thirdImg,
  },
];

export const testimonials = [
  {
    text: "Amazing experience! I loved traveling with this company and would recommend their services to anyone looking for an unforgettable trip!",
    author: "Sarah M.",
    profilePicture: person1,
  },
  {
    text: "Professional and exceptional service. The itinerary was perfectly planned and everything went smoothly.",
    author: "Michael R.",
    profilePicture: person2,
  },
  {
    text: "Best travel company we've ever used. The trip was perfectly organized and the destinations were amazing.",
    author: "Jennifer K.",
    profilePicture: person3,
  },
];
