const buttonStyle = {
  margin: "0 5px",
};

type EstablishmentsTableNavigationType = {
  pageNum: number;
  pageCount: number;
  isLoading: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export const EstablishmentsTableNavigation = (
  props: EstablishmentsTableNavigationType
) => {
  const { pageNum, pageCount, onPreviousPage, onNextPage, isLoading } = props;
  return (
    <nav>
      {
        <button
          data-test="previous-page-button"
          type="button"
          style={buttonStyle}
          disabled={pageNum <= 1 || isLoading}
          onClick={onPreviousPage}
        >
          -
        </button>
      }
      <span data-test="current-page-number">{pageNum}</span>
      {
        <button
          data-test="next-page-button"
          type="button"
          style={buttonStyle}
          disabled={pageNum >= pageCount || isLoading}
          onClick={onNextPage}
        >
          +
        </button>
      }
    </nav>
  );
};
