import api from "../api/api";

export const fetchBooks = (search, sortBy, setBookList) => {
  const myApi=api()

  myApi.get("product")
    .then((response) => {
      let filteredData = response.data;

      if (search !== "") {
        filteredData = filteredData.filter(
          (item) =>
            item.author.toLowerCase().includes(search.toLowerCase()) ||
            item.bookName.toLowerCase().includes(search.toLowerCase()) ||
            item.publisher.toLowerCase().includes(search.toLowerCase())
        );
      }

      switch (sortBy) {
        case "Author":
          filteredData.sort((a, b) =>
            a.author.toLowerCase() > b.author.toLowerCase() ? 1 : -1
          );
          break;
        case "Publisher":
          filteredData.sort((a, b) =>
            a.publisher.toLowerCase() > b.publisher.toLowerCase() ? 1 : -1
          );
          break;
        case "Genre":
          filteredData.sort((a, b) =>
            a.genre.toLowerCase() > b.genre.toLowerCase() ? 1 : -1
          );
          break;
        case "Book":
          filteredData.sort((a, b) =>
            a.bookName.toLowerCase() > b.bookName.toLowerCase() ? 1 : -1
          );
          break;
        case "Stock +":
          filteredData.sort((a, b) => a.count - b.count);
          break;
        case "Stock -":
          filteredData.sort((a, b) => b.count - a.count);
          break;
        case "Price +":
          filteredData.sort((a, b) => a.price - b.price);
          break;
        case "Price -":
          filteredData.sort((a, b) => b.price - a.price);
          break;
        case "Page Count +":
          filteredData.sort((a, b) => a.pageCount - b.pageCount);
          break;
        case "Page Count -":
          filteredData.sort((a, b) => b.pageCount - a.pageCount);
          break;
        default:
          // Default sort option
          break;
      }

      setBookList(filteredData);
    })
    .catch((error) => {
      console.log(error);
    });
};

