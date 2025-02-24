// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //

/////////// 제이쿼리 로딩구역/////////////////////////////////////////////////////////////
$(()=>{

    // 호출확인
    console.log("로딩완료")

    /******************************************************************************* 
        [ 가로방향 배너 요구사항 ]
        1. 오른쪽 버튼 클릭시 배너는 오른쪽에서 왼쪽으로 이동하여 다음슬라이드가 보임

        2. 왼쪽 버튼 클릭시 배너는 왼쪽에서 오른쪽으로 이동하여 이전 슬라이드가 보임

        3. 모든 배너는 무한이동을 원칙으로 한다.

        4. 배너 이동 시 배너의 순번을 블릿으로 표시한다.

        5. 자동 넘김이 세팅되어 있으며 사용자가 조작시 자동넘김이 멈춰지고 
        일정시간 놔두면 다시 자동넘김 활성화

    *******************************************************************************/

        // 이벤트 대상 : .abtn
        // 이벤트 : click() 메서드 사용
        // 양쪽버튼 구분 : .ab1(왼쪽 버튼) / .ab2(오른쪽 버튼)
        // 변경대상 :slide의 top값을 이동하여 애니메이션함
        let slide = $("#slide")
        // 변경에 사용할 제이쿼리 메서드 : animate({CSS속성}, 시간, 이징, 함수)

        // 변경대상 : 블릿 - .indic li
        let indic = $(".indic li")

        // 광클 금지변수
        let prot = 0; // 1- 불허용, 0- 허용

        // 애니메이션 시간 변수
        const aniT = 600;

        // 애니메이션 이징 변수
        const aniE = "easeOutExpo";


        $(".abtn").click(function(){

            // console.log("진입:", prot);

            ////광클 금지/////
            if(prot) return;
            prot = 1;//잠금
            setTimeout(()=>prot=0,aniT)
            // .6초후 prot=0 잠금해제


            // console.log("통과:", prot);

            // 자동넘김 지우기 함수 호출
            clearAuto();
            
            // 오른쪽 여부
            // is(클래스/아이디명) -> 선택요소해당여부 리턴 
            let isR = $(this).is(".ab2");


            // 호출확인(방향확인)
            console.log("오른쪽버튼인가?", isR)

   

            if (isR){//////오른쪽버튼

                slide.animate({top:"-100%"},
                aniT, // 시간
                aniE, // 이징
                function(){ // 이동 후 실행함수
                    // append(요소) - 자식요소로 맨뒤 추가(이동)
                    $(this) //slide
                    .append($("li",this).first())
                    // 첫번째 li요소 선택 -> 맨뒤로 이동
                    // $(요쇼,this) -> 나 자신 하위요소
                    // first() 첫번째요소
                    .css({top:"0"});
                    // 동시에 top 값을 0으로 변경
                });//// animate
                

            }/////////////////if


            else{/////////////위쪽버튼
                // 맨뒤요소를 맨앞에 이동
                slide.prepend(slide.find("li").last())
                // prepend(요소) 자식요소로 앞에 추가(이동)
                // find(요소) 자손 요소 찾기
                // last(요소) 마지막 요소

                // 동시에 top값 -100%
                .css({top:"-100%"})
                // 그후 top값 0으로 애니메이션
                .animate({top:"0"},aniT, aniE)


            }///////////////else///////

            // 3. 등장 슬라이드와 같은 순번의 블릿 변경하기
            // 변경내용 : 블릿 li에 class="on"을 주고 
            // 나머지 li에는 class="on"을 지운다

            // 같은 순번 슬라이드는 오른쪽일때 2번째 슬라이드(순번1)
            // 왼쪽일때 1번째 슬라이드 (순번0)

            

            // eq(순번) -> 몇번째 요소
            // .eq(isR?1:0) -> isR?1:0 -> 3항 연산자
            // isR이 true이면 (1이면) 1을 출력, 아니면 0출력
            let sseq = slide.find("li").eq(isR?1:0).attr("data-seq");

            console.log("슬순", sseq);

            // 등장 슬라이드 순번과 동일한 블릿 순번에 클래스 "on"주기
            // 제이쿼리 클래스주기 메서드 addClass(클명) 
            // 클래스 제거 메서드 removeClass(클명) 
            // 클래스 토글 메서드 toggleClass(클명)

            // 변경대상 : .indic li -> indic

            // 해당순번 (sseq)의 블릿li에 클래스 "on" 넣기
            indic.eq(sseq).addClass("on")
            // 다른형제 요소들 -> siblings()은 클래스 지워
            .siblings().removeClass("on")





        });/////////click///////////////


        // 블릿 순번을 결정하기 위한 슬라이드 고유번호 
        // 새로운 속성 만들기
        // 새로운 속성은 "data-" 라는 이름으로 시작하면 만들 수 있다
        // W3c공식 문법
        // 우리는 각 슬라이드에 'data-seq'라는 이름의 순번 저장용 속성을 만들고자 한다
        // 이때 사용할 제이쿼리 메서드는 바로 each() 메서드 - for문 안써도 됨.
        // each((idx,ele)=>{})
        // idx -> 첫번째 전달변수 : 순번
        // ele -> 두번째 전달변수 : 요소자신

        // 속성넣기 제이쿼리 메서드: attr(속성명,값)
        // 비교) JS의 속성세팅은 setAttribute(속성명,값)
        // 비교) JS의 속성 읽기는 getAttribute(속성명,값)
        // 제이쿼리는 하나로 다됨
        // attr(속성명) -> 속성값 읽기
        // attr(속성명, 값) -> 속성값 세팅
        

        // 대상 : 슬라이드 li
        slide.find("li").each((idx, ele)=>{
            // 'data-seq'라는 새로운 속성에 순번을 넣음
            $(ele).attr("data-seq",idx);

            // console.log(ele,idx)
        });////////////each///////////


        // 배너 자동호출 넘기기 세팅 ///////
        // 인터발함수 : setInterval(함수,시간)
        // 인터발 지우기 함수 : clearInterval(변수)
        // 타임아웃함수 : setTimeout(함수, 시간)        
        // 타임아웃 지우기 함수 : clearTimeout
        // 타이밍 함수는 변수에 할당해야 지울 수 있다.
        
        // 인터발용 변수
        let autoI;

        // 타임아웃용 변수
        let autoT;

        //인터발 최초호출
        autoSlide();

        // 인터발 호출함수
        function autoSlide(){
            autoI = setInterval(()=>{
                slide.animate({top:"-100%"}, aniT, aniE, 
                function(){$(this).append($("li",this).first()).css({top:"0"});
                });//// animate //////
                //블릿변경
                let sseq = slide.find("li").eq(1).attr("data-seq");

                indic.eq(sseq).addClass("on").siblings().removeClass("on");
            },3000)/////인터발함수
        }/////autoSlide 함수

        //// 인터발 지우기 함수 //////////////
        function clearAuto(){
            //인터발 지우기
            clearInterval(autoI);
            // 타임아웃지우기(실행 쓰나미 방지)
            clearTimeout(autoT);

            //일정시간 후 다시 인터발 불러오기
            autoT = setTimeout(autoSlide,4000);
        };


         










        // 근본적 해결 소스 아님/////////////////////
        /* setInterval(() => {
            $(".ab2").trigger("click")
        }, 4000); */
        // 제이쿼리 trigger(이벤트명) 메서드
        // -> 선택요소에 강제 이벤트 발생 메서드











////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
});///////////////////////////////////////////////////////////////////////////////
//////////JQB////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
