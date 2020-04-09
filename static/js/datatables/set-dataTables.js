$(document).ready(function(){
			
	/* 데이터 테이블 초기화 -- 페이지에 있는 전체 테이블 속성이 같게 설정됩니다. */
	$.extend( true, $.fn.dataTable.defaults, {
		"sDom": "<'table-wrap'tr><'pn-wrap'p>",
		"autoWidth": false,
		"paging": true,
		"bInfo": false,
		"bFilter": false,
		"bSort": false, // 오름,내림 정렬
		"bProcessing":false,
		"bServerSide": true, // 서버용...
		"pagingType": "simple_numbers_no_ellipses",
		"iDisplayLength" : 30,
		"aLengthMenu": [
			[10, 20, 30, -1],
			[10, 20, 30, "All"]
		],
		"oLanguage": {
			"sLengthMenu": "표시개수 _MENU_ ",
			"sProcessing": "",
			"sInfo" : "조회된 목록이 없습니다.",
			"sZeroRecords": "조회된 목록이 없습니다.",
			"sEmptyTable": "조회된 목록이 없습니다.",
			"sInfoEmpty" : "",
			"oPaginate": {
				"sFirst":"First",
				"sPrevious":"Prev",
				"sNext":"Next",
				"sLast":"Last"
			}
		},
		"drawCallback": function(settings){
			var $tableWrapper = $(settings.nTableWrapper);
			var $paging = $tableWrapper.find('.pn-wrap');

			if($tableWrapper.find('table tbody td').hasClass('dataTables_empty')){
				$paging.hide();
			}else{
				$paging.show();
			}
		}
	});
});