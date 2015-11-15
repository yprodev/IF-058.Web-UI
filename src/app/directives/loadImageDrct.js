app.directive('imageLoad', function () {

	// imageLoad directive link function
	function link (scope, element, attrs, ctrls) {
		var imageLabel = ctrls[0]
			, imageInput = ctrls[1];
	}

	// imageLoad directive controller function
	function imageLoadCtrl () {}

	return {
		restrict: 'E',
		template: [
			'<div class="form-group">',
				'<image-label></image-label>',
				'<image-input></image-input>',
			'</div>'
			].join('\n'),
		controller: ['$scope', imageLoadCtrl],
		link: link,
		scope: {
			options: '='
		}
	};
});

app.directive('imageLabel', ['$timeout', function ($timeout) {




	return {
		restrict: 'E',
		// scope: {},
		// require: 'filereadd',
		require: ['imageLabel', '^imageLoad'],
		template: [
			'<label class="btn btn-default btn-sm" for="photo" data-toggl="popover">',
				'<span class="glyphicon glyphicon-cloud-upload"></span>',
				'<span class="file-name">Choose Student\'s Photo</span>',
			'</label>'
		].join('\n'),
		controller: function ($scope, $element) {

		},
		link: function ($scope, $element, $attrs, fileCtrl) {
			if (!$attrs.toggl == 'popover') { return; }
			$($element).popover({
				html: true,
				trigger: 'hover',
				placement: 'top',
				title: 'SOME INFO',
				content: function () {
					return '<img src="' + i +'" />';

				// -------------------------------------------------
				$timeout(function () {
					console.log('popover ', fileCtrl.filereadd);
				}, 5000);
				// -------------------------------------------------

				}
			});
		}
	};
}]);





app.directive('imageInput', ['$timeout', function ($timeout) {

	// Cut file name
	function fileCutName (str, slength) {
		if (str.length >= 10) {
			return '... ' + str.slice(slength);
		}
		return str;
	}

	return {
		require: '^imageLoad',
		template: '<input type="file" name="studPhoto" id="photo" class="form-control inputfile" aria-describedby="helpPhoto" tabindex="9" image="studPhoto" accept="image/*">',
		controller: function ($scope, $element) {
			var ctrl = this
				, fileName
				, el = $element.parent().find('.file-name')// it will be in another directive
				, fileTarget
				, reader;

			$element.bind('change', function (changeEvent) {

				// Define fileTarget and fileName after change method (jqLite method)
				fileTarget = changeEvent.target.files[0];
				fileName = fileTarget.name;

				// Define cutted nama of the file and change the value of the button 
				$scope.cutName = fileCutName(fileName, -11);
				el.text($scope.cutName); // HERE must be a problem

				reader = new FileReader();
				reader.onload = function (loadEvent) {

					$scope.$apply(function () {
						//string base64 encoded
						$scope.fileread = loadEvent.target.result;
					});
				}; //END reader onload
				reader.readAsDataURL(fileTarget);


				// -------------------------------------------------
				$timeout(function () {
					console.log($scope.fileread, ' fileread xaxa');
				}, 5000);
				// -------------------------------------------------

			}); // END element bind

			ctrl.getFileTarget = function () {
				// -------------------------------------------------
				$timeout(function () {
					console.log(fileTarget, ' file Target HERE');
				}, 5000);
				// -------------------------------------------------
			};

		},// END controller
		scope: {
			fileread: '=image',
		},
		// link: function (scope, element, attributes) {

		// } // END LINK FUNCTION
	};
}]);
































/*



app.directive('filereadd', ['$timeout', function ($timeout) {

	// Cut file name
	function fileCutName (str, slength) {
			if (str.length >= 10) {
				return '... ' + str.slice(slength);
			}
		return str;
	}

	return {
		scope: {
			filereadd: '=',
			// getstr: '&'
		},
		controller: function ($scope, $element) {
			var ctrl = this
				, fileName
				, el = $element.parent().find('.file-name')
				, fileTarget
				, reader;

			$element.bind('change', function (changeEvent) {
				// var fileName
				// 	, fileTarget
				// 	, reader;

				// Define fileTarget and fileName after change method (jqLite method)
				fileTarget = changeEvent.target.files[0];
				fileName = fileTarget.name;

				// Define cutted nama of the file and change the value of the button 
				$scope.cutName = fileCutName(fileName, -11);
				el.text($scope.cutName);

				console.log('Changed el text', el);
				console.log($scope.cutName, 'cutted name');
				console.log(fileTarget, ' targeted file');
				console.log(fileName, ' targeted file name');

				reader = new FileReader();
				reader.onload = function (loadEvent) {

					$scope.$apply(function () {
						//string base64 encoded
						$scope.filereadd = loadEvent.target.result;
					});
				}; //END reader onload
				reader.readAsDataURL(fileTarget);


				// -------------------------------------------------
				$timeout(function () {
					console.log($scope.filereadd, ' filereadDDDD xaxa');
				}, 5000);
				// -------------------------------------------------

			}); // END element bind


		},

		link: function (scope, element, attributes) {

		} // END LINK FUNCTION
	};
}]);

//EXPERIMENTAL!
//DO NOT USE IN YOUR APP!
app.directive('toggl', ['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		// scope: {},
		// require: 'filereadd',
		link: function ($scope, $element, $attrs, fileCtrl) {
			if (!attrs.toggl == 'popover') { return; }
			$(element).popover({
				html: true,
				trigger: 'hover',
				placement: 'top',
				title: 'SOME INFO',
				content: function () {
					return '<img src="' + i +'" />';

				// -------------------------------------------------
				$timeout(function () {
					console.log('popover ', fileCtrl.filereadd);
				}, 5000);
				// -------------------------------------------------

				}
			});
		}
	};
}]);*/
