import React from 'react';

import cl from './Tags.module.scss';

function Tags({ tags }) {
  return (
    <div className={cl.tags}>
      {tags.map((tag, id) => {
        let newTag;
        const idTag = id + 1;

        if (!tag) {
          return;
        }

        if (tag && tag.length > 10) {
          //   newTag = tag.slice(0, 10) + '...';
        }

        if (tag) {
          newTag = tag;
        }

        // eslint-disable-next-line consistent-return
        return (
          <span key={idTag} className={cl.tag}>
            {newTag}
          </span>
        );
      })}
    </div>
  );
}

export default Tags;
