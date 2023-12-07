<?php

include "../connect/connect.php";
include "../connect/session.php";

$quizSql = "SELECT * FROM quiz  ORDER BY quizId DESC";
$quizResult = $connect->query($quizSql);

?>

<!DOCTYPE html>
<html lang="KO">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="../assets/css/quizHome.css">
    <link rel="stylesheet" href="../assets/css/style.css">
</head>

<body>
    <div id="wrap">
        <?php include "../include/header.php" ?>

        <div id="main">
            <div id="aside">
            <ul class="aside__nav">
                <h2>문제 유형</h2>
                <li>
                    <a href="quizCate.php?category=수학" onclick="window.location.href=this.href; return false;">
                        정보수정
                    </a>
                </li>
                <li>
                    <a href="quizCate.php?category=추리" onclick="window.location.href=this.href; return false;">
                        추리 문제
                    </a>
                </li>
                <li>
                    <a href="quizCate.php?category=창의력" onclick="window.location.href=this.href; return false;">
                        창의력 문제
                    </a>
                </li>
                <li>
                    <a href="quizCate.php?category=성냥" onclick="window.location.href=this.href; return false;">
                        성냥 문제
                    </a>
                </li>
                <li>
                    <a href="quizCate.php?category=기타" onclick="window.location.href=this.href; return false;">
                        기타 문제
                    </a>
                </li>
            </ul>
            </div>

            <section id="quiz_list">
                <div class="intro_inner">
                    <h3>카테고리</h3>
                    <article class="list">
                        <h3>풀고 싶은 문제만 모아서 보고싶다면 각 문제에 좋아요 표시를 하세요! 찜 목록에서 확인할 수 있습니다.</h3>
                        <a href="likes.php" class="like_btn">찜 목록</a>
                    </article>
                </div>

                <div class="contents">
                    <div id="filter-options">
                        <button class="filter-button" data-filter="latest">최신순</button>
                        <button class="filter-button" data-filter="popular">인기순</button>
                        <button class="filter-button" data-filter="unsolved">안푼문제</button>
                    </div>
                    <div id="dynamicContent">
                        <?php foreach ($quizResult as $quiz) { ?>
                            <div class="card">
                                <a href="quiz.php?quizId=<?= $quiz['quizId'] ?>">
                                    <ul class="card__text">
                                        <li>
                                            <?= $quiz['cate'] ?>
                                        </li>
                                        <li>
                                            <?= substr($quiz['question1'], 0, 100) ?>
                                        </li>
                                        <div class="cardtext_wrap">
                                            <li>
                                                <?= $quiz['quizId'] ?>
                                            </li>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px"
                                                    fill="#4a83cf" viewBox="0 0 24 24">
                                                    <path
                                                        d="M11.785,20.377c-0.251,0-0.503-0.096-0.695-0.288l-6.675-6.676c-1.198-1.198-1.758-2.914-1.497-4.591
                                            c0.266-1.707,1.33-3.156,2.92-3.976c1.924-0.994,4.285-0.646,5.947,0.857c1.662-1.501,4.022-1.851,5.947-0.857
                                            c1.59,0.82,2.654,2.269,2.92,3.976c0.261,1.677-0.298,3.393-1.497,4.591l-6.676,6.676C12.289,20.281,12.037,20.377,11.785,20.377z
                                            M8.141,5.297c-0.638,0-1.271,0.143-1.844,0.439c-1.302,0.672-2.173,1.854-2.39,3.241c-0.212,1.362,0.242,2.756,1.215,3.729
                                            l6.675,6.676l6.651-6.676c0.973-0.973,1.428-2.368,1.215-3.729c-0.216-1.388-1.087-2.569-2.39-3.241
                                            c-1.588-0.819-3.63-0.469-4.968,0.852l0,0c-0.287,0.284-0.755,0.284-1.042,0C10.41,5.744,9.269,5.297,8.141,5.297z" />
                                                </svg>
                                                <?= $quiz['likes'] ?>
                                            </li>
                                        </div>
                                    </ul>
                                </a>
                            </div>
                        <?php } ?>
                    </div>
            </section>
        </div>
        </section>
    </div>
    </div>

    <?php include "../include/footer.php" ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>

    <script>
        $(".filter-button").click(function () {
            var filter = $(this).data("filter");
            var category = $("#category").val(); // 카테고리 값을 가져옵니다

            var url; // 요청할 URL을 저장할 변수

            // 필터에 따라 요청할 URL을 결정
            if (filter === "latest") {
                url = 'getLatestQuizzes.php';
            } else if (filter === "popular") {
                url = 'getPopularQuizzes.php';
            } else if (filter === "unsolved") { // 안푼문제 필터에 대한 처리를 추가
                url = 'getUnsolvedQuizzes.php';
            }

            $.ajax({
                url: url,
                type: 'GET',
                data: { cate: category },
                success: function (data) {
                    $('#dynamicContent').html(data);
                },
                error: function (xhr, status, error) {
                    $('#dynamicContent').html('<p>문제목록을 불러오는데 실패했습니다.</p>');
                }
            });
        });
    </script>
    </div>
</body>

</html>