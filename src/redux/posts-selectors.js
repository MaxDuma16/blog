export const getAllPosts = (state) => {
  return state.postsPage.allPosts
}
export const getPartPosts = (state) => {
  return state.postsPage.partPosts
}
export const getCurrentPage = (state) => {
  return state.postsPage.currentPage
}
export const getTotalItemsCount = (state) => {
  return state.postsPage.totalItemsCount
}
export const getPageSize = (state) => {
  return state.postsPage.pageSize
}
export const getPortionSize = (state) => {
  return state.postsPage.portionSize
}
export const getIsFetching = (state) => {
  return state.postsPage.isFetching
}

export const getAuthorsList = (state) => {
  return state.postsPage.AuthorsList
}

