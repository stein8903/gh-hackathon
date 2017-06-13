(function($) {
	var reportController = {
		__name: 'handson.ReportController',

		__ready: function() {
			this.$find('input[name="reportDate"]').val(
				handson.utils.formatDateWithHyphen(new Date())
			);
			this.$find('input[name="startTime"]').val('09:00');
			this.$find('input[name="endTime"]').val(
				handson.utils.formatTime(new Date())
		  );
		},
		
		'input, textarea focusout': function(context, $el) {
		},

		'input[name="img"] change': function(context, $el) {
			// 変数の定義
			var $imgPreview = this.$find('.img-preview');
			
			// input要素からファイルを取得
			var file = $el[0].files[0];
			
			// FileReaderインスタンスの作成
			var reader = new FileReader();
			
			// ファイルが読み込まれた時の処理を記述
			reader.onload = function(e) {
				// 画像を表示
				$imgPreview.find('img').attr('src', e.target.result);
				$imgPreview.show();
			};
			// ファイル読み込み開始
			reader.readAsDataURL(file);
		},

		'.confirm click': function(context, $el) {
			// 初期化
		  context.event.preventDefault();

		  // パラメータの設定
		  var params = {};
		  var ary = this.$find('form').serializeArray();
		  for (i in ary) {
		    params[ary[i].name] = ary[i].value;
		  }
		  
		  // 複数行対応分のエスケープ処理
		  params.comment = h5.u.str.escapeHtml(params.comment)
		  
		  // ビューの設定
		  this.view.update('.modal-content', 'confirm', params);
		  
		  // モーダル表示
		  this.$find('#confirmModal').modal();
		},
		'.register click': function(context, $el) {
		  // Ajaxの擬似的実行
		  h5.ajax({
		    type: 'post',
		    data: this.$find('form').serialize(),
		    url: '/register'
		  }).then(function() {
		    alert('登録しました');
		    this.$find('#confirmModal').modal('hide');
		  })
		}

	};
	
	h5.core.expose(reportController);
})(jQuery);
$(function() {
	h5.core.controller(document.body, handson.ReportController);
});
