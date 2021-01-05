import React, { useState } from "react";

import { Pagination } from "semantic-ui-react";

const Pagin = ({ postsPerPage, totalPosts, paginate }) => {
  const [activePage, setActivePage] = useState();

  return (
    <Pagination
      defaultActivePage={1}
      firstItem={null}
      lastItem={null}
      activePage={activePage}
      pointing
      secondary
      totalPages={Math.ceil(totalPosts / postsPerPage)}
      onPageChange={(event, data) => {
        paginate(data.activePage);
        setActivePage(data.activePage);
      }}
    />
  );
};

export default Pagin;
