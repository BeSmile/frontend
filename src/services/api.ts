import request from "../utils/request";

export async function fetchBook() {
  return request(
    "https://novel.juhe.im/book/reviews?book=51060c88bb1c67cf28000035",
    {}
  );
}
