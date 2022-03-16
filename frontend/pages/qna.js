import Link from 'next/link';
import { useEffect, useState } from 'react';
import QnaList from '/components/QnA/QnaList.js';
import WriteQna from '/components/QnA/WriteQna.js';
import ModifyQna from '/components/QnA/ModifyQna.js';
import DetailQna from '/components/QnA/DetailQna.js';

function qna() {

    const [page, setPage] = useState("기본");
    const highFunction = (text) => {
        setPage(text);
    }

    useEffect(() => {
        window.scrollTo(0, 700);
      }, [page]);

    return (
        <>
            <div>
                {
                    page === "기본" && <QnaList propFunction={highFunction} />
                }
                {
                    page === "작성" && <WriteQna propFunction={highFunction}  />
                }
                {
                    page === "수정" && <ModifyQna propFunction={highFunction}  />
                }
                {
                    page === "상세" && <DetailQna propFunction={highFunction}  />
                }
            </div>
        </>
    );
}

export default qna;