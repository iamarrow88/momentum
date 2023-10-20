import { createApi } from "unsplash-js";

export default class UnsplashApi {
  constructor(tag) {
    this.MY_ACCESS_KEY = "vnG4zqeBwcPQvR4H2lA56teaxU_hiGwsxuOyU_s3hDI";
    this.unsplashAPI = createApi({
      accessKey: this.MY_ACCESS_KEY,
    });
    this.tag = tag;
  }

  async getPhotoByTag() {
    return await this.unsplashAPI.search.getPhotos({ query: this.tag, perPage: 20, orientation: "landscape" });
  }
}
