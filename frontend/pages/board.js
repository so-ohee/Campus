import { useEffect, useState } from 'react';
import BoardList from '/components/Board/BoardList.js';
import WriteMain from '/components/Board/WriteMain.js';
import ModifyReview from '/components/Board/ModifyReview.js';
import DetailReview from '/components/Board/DetailReview.js';
import DetailQnaFree from '/components/Board/DetailQnaFree.js';

function Board(props) {

    const [page, setPage] = useState("기본");
    const [datas, setDatas] = useState("");

    // 어떤 기능인지 받아옴
    const highFunction = (text) => {
        setPage(text);
    }

    // 캠핑ID 받아옴
    const highData = (text) => {
        setDatas(text);
    }

    // 새로고침 또는 페이진 전환 시 초기 위치
    useEffect(() => {
        window.scrollTo(0, 500);
    }, [page]);

    return (
        <>
            <div>
                {
                    page === "기본" && <BoardList propFunction={highFunction} propData={highData} datas={datas} />
                }
                {
                    page === "작성" && <WriteMain propFunction={highFunction} propData={highData} datas={datas} />
                }
                {
                    page === "수정" && <ModifyReview propFunction={highFunction} propData={highData} datas={datas} />
                }
                {
                    page === "상세" && <DetailReview propFunction={highFunction} propData={highData} datas={datas} />
                }
                {
                    page === "자유상세" && <DetailQnaFree propFunction={highFunction} propData={highData} datas={datas} />
                }
            </div>
        </>
    );
}

export default Board;