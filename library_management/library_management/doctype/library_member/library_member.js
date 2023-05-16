// Copyright (c) 2023, Abhay and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Library Member', {
// 	refresh: function(frm) {
// 		// validate phone number
// 		frm.set_df_property('phone', 'validate', function() {
// 			var phone_number = frm.doc.phone;
// 			var phone_regex = /^\d{10}$/; // regular expression for 10-digit phone number
				
// 			if (!phone_number.match(phone_regex)) {
// 				msgprint('Please enter a valid 10-digit phone number.');
// 				return false;
// 			} else {
// 				return true;
// 			}
// 		});
			
// 			// validate email_address address
// 		frm.set_df_property('email_address_address', 'validate', function() {
// 			var email_address = frm.doc.email_address_address;
// 			var email_address_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expression for email_address address
				
// 			if (!email_address.match(email_address_regex)) {
// 				msgprint('Please enter a valid email_address address.');
// 				return false;
// 			} else {
// 				return true;
// 			}
// 		});
// 	}
// });
// frappe.ui.form.on('Library Member', {
// 	validate: function(frm) {
// 		if (frm.doc.phone) {
// 			var value = frm.doc.phone;
// 			if (value.length > 10 || !(/^\d+$/.test(value))) {
// 				frappe.msgprint(__('Only Numeric values allowed for phone number'));
// 				frm.set_value('phone', '');
// 			}}
// 	},
	
	



// 	refresh: function(frm) {
// 		if (frm.fields_dict.phone) {
// 			var $input = frm.fields_dict.phone.$input;
// 			$input.on('keypress', function(event) {
// 				if (!/[0-9]/.test(String.fromCharCode(event.which))) {
// 					frappe.show_alert({
// 						message: __('Only numeric values allowed for phone number'),
// 						indicator: 'red'
// 					});
// 					event.preventDefault();
// 				} else if (this.value.length >= 10) {
// 					event.preventDefault();
// 				}
// 			});
// 		}
// },
// });
// frappe.ui.form.on('Library Member', {
// 	validate: function(frm) {
// 		if (frm.doc.phone && !(/^\d{10}$/.test(frm.doc.phone))) {
// 			frappe.msgprint(__('Only numeric input of 10 digits is allowed for phone number'));
// 			frm.set_value('phone', '');
// 		}

// 		if (frm.doc.email_address && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(frm.doc.email_address))) {
// 			frappe.msgprint(__('Please enter a valid email_address address'));
// 			frm.set_value('email_address', '');
// 		}
// 	},

// 	refresh: function(frm) {
// 		if (frm.fields_dict.phone) {
// 			var $input = frm.fields_dict.phone.$input;
// 			$input.on('keypress', function(event) {
// 				if (!/[0-9]/.test(String.fromCharCode(event.which))) {
// 					frappe.show_alert({
// 						message: __('Only numeric values allowed for phone number'),
// 						indicator: 'red'
// 					});
// 					event.preventDefault();
// 				} else if (this.value.length >= 10) {
// 					event.preventDefault();
// 				}
// 			});
// 		}
// 	},
// });
frappe.ui.form.on('Library Member', {
	validate: function(frm) {
		if (frm.doc.phone && !/^\d{10}$/.test(frm.doc.phone)) {
			frappe.msgprint(__('Phone number must be 10 digits'));
			frm.set_value('phone', '');
		}
		if (frm.doc.email_address && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(frm.doc.email_address)) {
			frappe.msgprint(__('Please enter a valid email_address address'));
			frm.set_value('email_address', '');
		}
	},
	
	refresh: function(frm) {
		if (frm.fields_dict.phone) {
			var $input = frm.fields_dict.phone.$input;
			$input.on('keypress', function(event) {
				if (!/^\d$/.test(String.fromCharCode(event.which)) || this.value.length >= 10) {
					event.preventDefault();
				}
			});
		}
	},
});
frappe.ui.form.on('Library Member', {
    refresh: function(frm) {
        frm.add_custom_button('Create Membership', () => {
            frappe.new_doc('Library Membership', {
                library_member: frm.doc.name
            })
        })
        frm.add_custom_button('Create Transactions', () => {
            frappe.new_doc('Library Transactions', {
                library_member: frm.doc.name
            })
        })
    }
});
frappe.ui.form.on('Library Member', {
	validate: function(frm) {
	  if (frm.doc.first_name && frm.doc.first_name.includes(' ')) {
		frappe.msgprint(__('Space is not allowed in the First Name field.'));
	  }
	}
  });
  frappe.ui.form.on('Library Member', {
	refresh: function(frm) {
		if (frm.fields_dict.first_name) {
			var $input = frm.fields_dict.first_name.$input;
			$input.on('keypress', function(event) {
				if (event.which === 32) {
					event.preventDefault();
					frappe.msgprint('Space is not allowed in the First Name field.');
				}
			});
		}
	},
});

