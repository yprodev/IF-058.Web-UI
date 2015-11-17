app.directive('imageLoad', ['$timeout', function ($timeout) {

	// imageLoad directive link function
	function link ($scope, $element, $attrs, $ctrls) {

	}

	// imageLoad directive controller function
	function imageLoadCtrl ($scope) {

		$scope.studPhoto = {
			src: '',
			name: ''
		};

		var ctrl = this;
		ctrl.setImgSrc = function (src) {
			$scope.studPhoto.src = src; //END observe
		};

		ctrl.setImgName = function (name) {
			$scope.studPhoto.name = name; //END observe
		};

	}

	return {
		restrict: 'E',
		template: [
			'<div class="form-group">',
				'<image-label image="{{ studPhoto.src }}" image-name="{{ studPhoto.name }}"></image-label>',
				'<image-input></image-input>',
			'</div>'
			].join('\n'),
		controller: ['$scope', imageLoadCtrl],
		link: link,
		scope: {
			options: '='
		}
	};
}]);


app.directive('imageLabel', ['$timeout', function ($timeout) {

	function link ($scope, $element, $attrs, ctrls) {
		var parentCtrl = ctrls[0]
			, img;

			$attrs.$observe('image', function () {
				// Inner variables
				var picSrc = $scope.image
					, picName = $scope.imageName;

				if (picSrc) {
					$($element).popover({
						html: true,
						trigger: 'hover',
						placement: 'top',
						title: (picName !== '' && picName !== undefined) ? picName : 'there is no name',
						content: function () {
							return '<img class="img-popover" src="' + picSrc + '" />';
						}
					}); // END jQuery element selecting
				} // END if statement

			});
	}// END link function


	return {
		restrict: 'E',
		scope: {
			image: '@',
			imageName: '@'
		},
		require: ['^imageLoad'],
		template: [
			'<label class="btn btn-default btn-sm" for="photo">',
				'<span class="glyphicon glyphicon-cloud-upload"></span>',
				'<span class="file-name">Choose Student\'s Photo</span>',
			'</label>'
		].join('\n'),
		link: link
	};

}]);





app.directive('imageInput', [function () {

	// Cut file name function
	function fileCutName (str, slength) {
		if (str.length >= 10) {
			return '... ' + str.slice(slength);
		}
		return str;
	}


	function link ($scope, $element, $attrs, ctrls) {
		var parentCtrl = ctrls[0]
			, fileTarget
			, fileName
			, el = $element.parent().find('.file-name')
			, reader;
		// This functionality needs to be here ...
		// ... because of access to parentCtrl methods after onload event
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
					$scope.fileread = loadEvent.target.result;

					// Transfer data to the parent directive controller
					parentCtrl.setImgSrc(reader.result);
					parentCtrl.setImgName($scope.cutName);
				});
			};
			reader.readAsDataURL(fileTarget);
		}); // END element bind
	} // END LINK FUNCTION



	return {
		template: '<input type="file" name="studPhoto" id="photo" class="form-control inputfile" aria-describedby="helpPhoto" tabindex="9" image="studPhoto" accept="image/*">',
		scope: {
			fileread: '=image',
		},
		require: ['^imageLoad'],
		link: link
	};
}]);
