import Link from 'next/link';
import { useState } from 'react';
import BoardList from '/components/Board/BoardList.js';
import WriteReview from '/components/Board/WriteReview.js';

function board() {

    const [page, setPage] = useState("기본");
    const highFunction = (text) => {
        setPage(text);
      }

    return (
        <>
            <div>
                {
                    page === "기본" && <BoardList propFunction={highFunction} />
                }
                {
                    page === "작성" && <WriteReview />
                }
                
            </div>
        </>
    );
}

export default board;