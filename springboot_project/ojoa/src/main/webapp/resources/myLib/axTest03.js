"use strict"

// ** Ajax_REST API, Axios Test **

// 1. axMemberList 의 id를 클릭하면 본인이 등록한 글목록을
//    resultArea2 에 출력하기
// => get요청 : /rest/idblist/apple
// => 성공: JS 객체로 전달된 List 출력문 만들기
// => 실패: 오류 메시지 출력, resultArea2 클리어
// => 서버
//   - RTestController, SQL구문은 ~Mapper 인터페이스에 @ 으로 작성
//   - @PathVariable 사용, response는 ResponseEntity에 List 객체로

function idbList(id) {

	let url = "/rest/idblist/"+id;
	axios.get(url
	).then(response => {
	
		alert("** Page 하단에 List 출력 완료!! **")
		console.log("** idBList **"+response.data);
	
		// JS 객체로 전달된 Data 출력문 만들기
		let list1 = response.data;
		console.log("** list1.length **"+list1.length);
		
		let resultHtml = 
		`<table style="width:100%">
			<tr bgcolor="DodgerBlue">
				<th>Seq</th><th>Title</th><th>ID</th><th>Regdate</th><th>조회수</th>
			</tr>`;
		
		// => 반복문을 이용해서 list 출력문을 완성하세요 ~~
		for ( let s of list1 ) {
			console.log(`id=${s.id}, title=${s.title}`);
			resultHtml +=`
			<tr>
				<td>${s.seq}</td><td>${s.title}</td>
				<td>${s.id}</td><td>${s.regdate}</td><td>${s.cnt}</td>
			</tr>`
		} //for
		
		resultHtml +=`</table>`;
		document.getElementById('resultArea2').innerHTML = resultHtml;
		
		// ** for 간편출력 : of, in
		// => in : undifined 는 통과하고, 배열(index Return), 객체(속성명 Return)
		// => of : undifined 까지 모두 출력 (순차출력과 동일), value 를 return,
		//		   ES6 에 for ~ in 의 단점을 보완 개선하여 추가됨.
		//         일반 객체에는 적용안되지만, (오류발생, 개발자모드로 확인가능)
		//         Array, String, Map, Set, function의 매개변수 객체 와
		//         이터러블 규약을 따르는 이터러블 객체 (Iterable Object) 는 적용됨
		// => 이터러블 규약
		//    내부에 Symbol.iterator (줄여서 @@iterator로 표현하기도함) 메서드가 구현되어 있어야 한다는 규약 
		
		// ** JSON.stringify 적용 비교
		let list2 = JSON.stringify(response.data);
		// => Object -> JSON 형태로 Data를 나열해줌 (즉, 하나의 긴문자열, 문자Type 이됨)
		// => fetch 에서 Post 요청시 서버로 전송하는 Data를 JSON 포맷화 할때 사용,
		//    console.log 로 response.data 의 내용을 확인할때 주로 사용함. 
		console.log("** list2.length **"+list2.length);
		console.log("** list2 **"+list2);
		
	}).catch(err => {
		document.getElementById('resultArea2').innerHTML = "";
		if ( err.response.status == '502' ) alert(err.response.data);
		else alert("~~ 시스템 오류, 잠시후 다시하세요 => "+err.message);
	});
} //idbList

// *** JoDetail
// 1) showJoDetail(${s.jno})
// => jno에 onmouseover : jno 의 detail을 content div에 출력하기
// => request: axios, get, RTestController, jodetail 요청
// => response: JoDTO 객체

function showJoDetail(e,jno) {
	// ** 이벤트객체 활용
	// => 마우스포인터 위치 확인
	//    - event객체 (이벤트핸들러 첫번째 매개변수) 가 제공
	//    - e.pageX, e.pageY : 전체 Page 기준
	//    - e.clientX, e.clientY : 보여지는 화면 기준 -> page Scroll 시에 불편함
	
	console.log(`** e.pageX=${e.pageX}, e.pageY=${e.pageY}`);
	console.log(`** e.clientX=${e.clientX}, e.clientY=${e.clientY}`);

	let url = "/rest/jodetail?jno="+jno;
	let mleft = e.pageX;
	let mtop = e.pageY;
	
	axios.get(url
	).then(response => {
		console.log("** response 성공 => "+response.data);
		let jo = response.data;
		console.log("** Data: jo.jno => "+jo.jno);
		let resultHtml = `
		<table>
			<tr height = "20"><td>Jno</td><td>${jo.jno}</td></tr>
			<tr height = "20"><td>JoName</td><td>${jo.jname}</td></tr>
			<tr height = "20"><td>CaptainID</td><td>${jo.id}</td></tr>
			<tr height = "20"><td>Project</td><td>${jo.project}</td></tr>
			<tr height = "20"><td>Slogan</td><td>${jo.slogan}</td></tr>
		</table>`;
		document.getElementById('content').innerHTML = resultHtml;
		document.getElementById('content').style.display = 'block';
		document.getElementById('content').style.left = mleft + "px";
		document.getElementById('content').style.top = mtop + "px";
		
	}).catch(err => {
		if ( err.response.status == '502') alert(err.response.data);
		alert("~~ 시스템 오류, 잠시후 다시하세요 => "+err.message);
	});
} //showJoDetail

// 2) hideJoDetail()
// => 화면에 표시되어있는 content div 가 사라짐.

function hideJoDetail() {
	document.getElementById('content').style.display = 'none';
} //hideJoDetail
