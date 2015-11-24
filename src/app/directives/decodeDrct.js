app.directive('decodeDrct', function ($filter) {
return {
    restrict: 'AE',
link: function (scope, element, attrs) {
  scope.decoding = function (){
    if (scope.thisEntity == 'question'){
      scope.editedEntity.new_question_text = $filter('decode')(scope.editedEntity.new_question_text)
    }else if (scope.thisEntity == 'answer'){
      scope.editedEntity.new_answer_text = $filter('decode')(scope.editedEntity.new_answer_text)
    }
  }
}
}
})