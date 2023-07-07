export default interface filtersTypes {
  currentPage: number;
  searchQuery: string;
  selectedCategory: {
    _id: string;
    name: string;
    image: string;
  } | null;
  sortColumn: { path: string; order: "asc" | "desc" };
}
