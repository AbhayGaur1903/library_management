# Copyright (c) 2023, Abhay and contributors
# For license information, please see license.txt

import frappe
from frappe.model.docstatus import DocStatus
from frappe.model.document import Document
from frappe.utils import nowdate




class LibraryTransactions(Document):
    def before_submit(self):
        if self.type == "Issue":
            self.validate_issue()
            # set the articles status to be Issued
            articles = frappe.get_doc("Articles", self.articles)
            articles.available_copies -= 1
            articles.save()
            self.validate_inventory()
            
        elif self.type == "Return":
            self.validate_return()
            # set the articles status to be Available
            articles = frappe.get_doc("Articles", self.articles)
            articles.available_copies += 1     
            articles.save()

    def validate_inventory(self):
        articles = frappe.get_doc("Articles", self.articles)
        if (articles.available_copies == 0):
                articles.status = "Not Available"
                frappe.msgprint("Articles Not Available Right Now.")
                articles.save()
        
    def validate_issue(self):
        self.validate_membership()
        articles = frappe.get_doc("Articles", self.articles)
        if (articles.available_copies > 0):
            articles.status = "Available"
        else:
            frappe.throw ("Articles Not Available")

    def validate_return(self):
        articles = frappe.get_doc("Articles", self.articles)
        # articles cannot be returned if it exceeds total number of copies
        if (articles.available_copies >= articles.total_copies):
            frappe.throw("Total Copies of Articles Already Available!")
    
    
    def validate_maximum_limit(self):
        max_articles = frappe.db.get_single_value("Library Settings", "maximum_book_issued")
        count = frappe.db.count(
            "Library Transaction",
            {"library_member": self.library_member, "type": "Issue", "docstatus": DocStatus.submitted()},
        )
        if count >= max_articles:
            frappe.throw("Maximum limit reached for issuing articles")
    
    def validate_membership(self):
        # check if a valid membership exist for this library member
        valid_membership = frappe.db.exists(
            "Library Membership",
            {
                "library_member": self.library_member,
                "docstatus": DocStatus.submitted(),
                "from_date": ("<", self.date),
                "to_date": (">", self.date),
            },
        )
        if not valid_membership:
            frappe.throw("The member does not have a valid membership")
 
    # def calculate_penalty(self):
    #     penalty_percentage = frappe.db.get_single_value("Library Settings", "penalty_percentage")
    #     loan_period = frappe.db.get_single_value("Library Settings", "loan_period")

    #     if not penalty_percentage or not loan_period:
    #         return 0

    #     if self.date:
    #         days_late = (self.date - self.from_date).days
    #     else:
    #         days_late = (frappe.utils.nowdate() - self.from_date).days

    #     if days_late <= loan_period:
    #         return 0

    #     penalty_amount = self.total_amount * penalty_percentage / 100 * (days_late - loan_period)
    #     return penalty_amount
