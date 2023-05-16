// Copyright (c) 2023, Abhay and contributors
// For license information, please see license.txt

frappe.ui.form.on('Library Settings', {
	// refresh: function(frm) {

	// }
});
frappe.ui.form.on('Loan', {
    refresh: function(frm) {
        // Calculate penalty amount
        var penalty_rate = frappe.db.get_single_value('Library Settings', 'penalty_rate') || 0;
        var penalty_days = frappe.db.get_single_value('Library Settings', 'penalty_days') || 0;
        var penalty_amount = 0;
        if (frm.doc.return_date && frm.doc.return_date > frm.doc.to_date) {
            var days_late = frappe.datetime.get_day_diff(frm.doc.return_date, frm.doc.to_date);
            if (days_late > penalty_days) {
                penalty_amount = (days_late - penalty_days) * penalty_rate;
            }
        }

        // Update penalty amount field
        frm.set_value('penalty_amount', penalty_amount);
    }
});

