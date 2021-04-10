export const initState = {
  currentUser: {
    info: null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    errorMessage: '',
    forgotPasswordMessage: '',
    forgotPasswordError: '',
    resetPasswordError: '',
    resetPasswordMessage: '',
    signupError: '',
    signupMessage: '',
  },
  post: {
    item: {},
    comments: [],
  },
  postList: {
    items: [],
    postCount: 0,
    currentPage: 0,
    itemsPerPage: 10,
  },
  profile: {
    id: '',
    username: '',
    image: '',
    following: false,
    short_bio: '',
  },
  home: {
    currentTab: '',
    tags: [],
  },
  globalLoading: {
    isLoading: false,
  },
};
