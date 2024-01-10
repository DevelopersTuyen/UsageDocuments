define([
    'jquery',
    'uiComponent',
    'ko'
], function ($, Component, ko) {
    'use strict';
     $('#search_mini_form').on('keyup keypress', function(event) {
      var key = event.keyCode || event.which;
      if (key === 13) { 
        // console.log ("1123213");
        event.preventDefault();
        // console.log ("aaaa");
        return false;
      }
    });

    return Component.extend({
        defaults: {
            template: 'MageWorx_SearchSuiteAutocomplete/autocomplete',
            addToCartFormSelector: '[data-role=searchsuiteautocomplete-tocart-form]',
            showPopup: ko.observable(false),
            result: {
                suggest: {
                    data: ko.observableArray([])
                },
                product: {
                    data: ko.observableArray([]),
                    size: ko.observable(0),
                    url: ko.observable('')
                }
            },
            anyResultCount: false
        },


        initialize: function () {
            var self = this;
            this._super();

            this.anyResultCount = ko.computed(function () {
                var sum = self.result.suggest.data().length + self.result.product.data().length;
                if (sum > 0) {
                    return true; }
                return false;
            }, this);
        },

    });
});
