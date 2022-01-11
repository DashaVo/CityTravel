import { ITripPreviewModel } from './tirpPreview.model';
import { IRating } from './rating.model';
import { AddCommentModel } from "./comment.model";
import { IEntertainmentPreview } from "./entertainment.preview.model";
import { IEntertainmentShow } from "./entertainment.show.model";
import { AddReviewModel } from "./review.model";
import { IReviewPreviewModel } from "./reviewPreview.model";
import { RegisterRequest } from './general.model';
import { ITrip } from './tripModel';
import { IFilterEntertainments } from './filters/filtertEntertainments';
import { IFilterTrips } from './filters/filterTrips';
import { IFiltertUsers } from './filters/filterUsers';


export const registerData: RegisterRequest = {
  name:"",
  gender:"",
  avatarSrc:"",
  userName:"",
  password:"",
  email:"",
}
export const tripData: ITrip = {
  id: '',
  title: '',
  description: '',
  tagString: '',
  tripStart: new Date,
  tripEnd: new Date,
  optimalSpent: new Date,
  realSpent: new Date,
  price: '',
  averageRating: '',
  tripStatus: 4,
  dafaultTrip: true,
  images: [],
  mainImage: {
    source: '',
    title: ''
  },
  reviews: [],
  entertainments: [],
  users: []
}



export const entertainmentShow = {
    id: "",
    title: "",
    type: "",
    address: {
      street: {
        title: ""
      },
      houseNumber: "",
      apartmentNumber: "",
    },
    description: "",
    images: [],
    averagePrice: {
      title: "",
      value: 0,
    },
    averageRating: 0,
    mainImage: {source: "", title: ""},
    begin: "",
    end: "",
} as IEntertainmentShow;

export const entertainmentPreview = {
    id: "",
    title: "",
    type: "",
    address: {
      street: {
        title: ""
      },
      houseNumber: "",
      apartmentNumber: "",
    },
    tripsCount: 0,
    reviewsCount: null,
    averageRating: null,
    mainImage: {
      source: "",
      title: "",
    }
  } as IEntertainmentPreview;


  export const reviewPreview : IReviewPreviewModel = {
    id: "",
    name: "",
    title: "",
    description: "",
    imageDTO: {
        source: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        title: "default",
    },
    modified: "",
    ratingValue: 0,
  } as IReviewPreviewModel;

  export const tripPreview = {
    id: "",
    averageRating: 0,
    title: "",
    description: "",
    tagSting: "",
    optimalSpent: null,
    dafaultTrip: false,
    mainImage: {
      source: "",
      title: "",
  }
  } as ITripPreviewModel;

  export const rating : IRating = {
    reviewId: '',
    userId: '',
    value: 0,
    entertainmentId: ''
  }
  export const addReview:AddReviewModel= {
    userId: '',
    title: '',
    description: '',
    entertainmentId: '',
    tripId: '',
    images: [],
    comments: []
  }

  export const addComment: AddCommentModel = {
    reviewId: '',
    status: 0,
    description: '',
    ownerId: '',
    name: ''
  }

  export const propsEntertainment: IFilterEntertainments = {
    streetName: '',
    type: 4,
    houseNumber: '',
    tripName: '',
    title: '',
    priceMore: 0,
    priceLess: 10000,
    ratingMore: 0,
    ratingLess: 5
  };

  export const propsTrip: IFilterTrips = {
    tripStart: new Date(),
    entertainmentName: '',
    user: '',
    priceMore: 0,
    priceLess: 10000,
    averageRatingMore: 0,
    averageRatingLess: 5,
    title: '',
    description: '',
    tripStatus: 4
  };

  export const props: IFiltertUsers = {
    name: "",
    entertainmentName: "",
    gender: ""
  };
  export const defaultTrip: ITrip = {
    id: '',
    title: '',
    description: '',
    tagString: '',
    optimalSpent: undefined,
    price: '',
    averageRating: '',
    images: [],
    mainImage: {
      source: '',
      title: ''
    },
    reviews: [],
    entertainments: [],
    users: []
  }
