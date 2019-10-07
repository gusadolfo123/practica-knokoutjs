ko.bindingHandlers.select2 = {
	after: ['options', 'value'],
	init: function(el, valueAccessor, allBindingsAccessor, viewModel) {
		$(el).select2(ko.unwrap(valueAccessor()));
		ko.utils.domNodeDisposal.addDisposeCallback(el, function() {
			$(el).select2('destroy');
		});
	},
	update: function(el, valueAccessor, allBindingsAccessor, viewModel) {
		var allBindings = allBindingsAccessor();
		var select2 = $(el).data('select2');
		if ('value' in allBindings) {
			var newValue = '' + ko.unwrap(allBindings.value);
			if ((allBindings.select2.multiple || el.multiple) && newValue.constructor !== Array) {
				select2.val([newValue.split(',')]);
			} else {
				select2.val([newValue]);
			}
		}
	},
};

const City = function(name) {
	this.name = name;
};

const viewModel = {
	firstName: ko.observable('Gustavo Adolfo'),
	lastName: ko.observable('Moreno Muñoz'),
	birthDay: ko.observable(moment().format('YYYY-MM-DD')),
	cities: ko.observableArray([new City('Bogota'), new City('Medellin'), new City('Cali')]),
	selectedCity: ko.observable(),
};

ko.applyBindings(viewModel);

$('#cities').select2();
