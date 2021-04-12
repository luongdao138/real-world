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
    isOwn: false,
    comments: {
      items: [],
      current: 0,
      total: 0,
    },
  },
  postList: {
    items: [],
    postCount: 0,
    currentPage: 1,
    itemsPerPage: 10,
  },
  user: {
    info: {},
    isOwn: false,
    favoritePosts: [],
    posts: [],
    followers: [],
    following: [],
    isFollowed: false,
  },
  home: {
    currentTab: localStorage.getItem('token') ? 'personal' : 'global',
    tags: [],
  },
  globalLoading: {
    isLoading: false,
  },
};
