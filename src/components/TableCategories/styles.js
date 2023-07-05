export default {
  ".categories-filter": {
    display: "flex",
    position: "relative",
    top: "15px",
    padding: "0 0 20px",
    gap: "15px",
    overflowX: "scroll",
    boxSizing: "border-box",
    opacity: 0,
    height: 0,
    transition: "all 0.3s ease-in-out",
  },
  ".categories-filter.active": { opacity: 1, height: "auto" },
  ".categories-filter__button": {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
  },
  ".categories-filter__button-body": {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  ".categories-filter__image": { width: "100%", objectFit: "contain" },
};