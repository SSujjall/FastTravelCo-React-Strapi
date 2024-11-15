import type { Schema, Struct } from '@strapi/strapi';

export interface PopularAmenitiesPopularAmenities
  extends Struct.ComponentSchema {
  collectionName: 'components_popular_amenities_popular_amenities';
  info: {
    displayName: 'PopularAmenities';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'popular-amenities.popular-amenities': PopularAmenitiesPopularAmenities;
    }
  }
}
