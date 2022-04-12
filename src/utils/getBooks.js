import axios from "axios";
export default async function getBooks(input, setBooks) {
  let processedInput = input.trim().split(" ").join("+");
  try {
    console.log(
      "https://www.googleapis.com/books/v1/volumes?q=" + processedInput
    );

    const booksObject = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        processedInput +
        "&maxResults=20"
    );

    setBooks(booksObject.data.items);
  } catch (err) {
    console.log(err);
  }
}
