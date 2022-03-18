import Link from 'next/link';
import { useEffect, useState } from 'react';
import BoardList from '/components/Board/BoardList.js';
import WriteMain from '/components/Board/WriteMain.js';
import ModifyReview from '/components/Board/ModifyReview.js';
import DetailReview from '/components/Board/DetailReview.js';
import DetailQnaFree from '/components/Board/DetailQnaFree.js';

function board() {

    const [page, setPage] = useState("기본");
    const highFunction = (text) => {
        setPage(text);
    }

    useEffect(() => {
        window.scrollTo(0, 500);
      }, [page]);

    return (
        <>
            <div>
                {
                    page === "기본" && <BoardList propFunction={highFunction} />
                }
                {
                    page === "작성" && <WriteMain propFunction={highFunction}  />
                }
                {
                    page === "수정" && <ModifyReview propFunction={highFunction}  />
                }
                {
                    page === "상세" && <DetailReview propFunction={highFunction}  />
                }
                {
                    page === "자유상세" && <DetailQnaFree propFunction={highFunction}  />
                }
            </div>
        </>
    );
}

export default board;