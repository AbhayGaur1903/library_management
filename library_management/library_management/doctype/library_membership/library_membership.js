// Copyright (c) 2023, Abhay and contributors
// For license information, please see license.txt

frappe.ui.form.on('Library Membership', {
	// refresh: function(frm) {

	// }
});

frappe.ui.form.on('Library Membership', {
	library_member: function (frm) {
		frm.set_value('lm_barcode',frm.doc.library_member);
	}
})