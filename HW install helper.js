// ==UserScript==
// @name         HW Installation MCM helper
// @namespace    https://mcm.amazon.com
// @version      0.1
// @description  HW Installation MCM helper
// @author       chengng@
// @match        https://mcm.amazon.com/cms/new?from_template=0d640ded-d096-48a6-b3f5-c7c2d5fa76a7
// @updateURL    https://raw.githubusercontent.com/joshm3u/HW-install-helper/main/HW%20install%20helper.js
// @downloadURL  https://raw.githubusercontent.com/joshm3u/HW-install-helper/main/HW%20install%20helper.js
// @grant        none
// ==/UserScript==

/*
REVISION HISTORY:
0.1 - 2023-09-13 - chengng@ - Initial setup for the HW installation helper
*/

(function() {
    'use strict';

    // Function to extract content between square brackets
    function extractContent(inputString, startChar, endChar, occurrence) {
        const regex = new RegExp(`\\${startChar}(.*?)\\${endChar}`, 'gi'); // Case-insensitive regex
        const matches = inputString.match(regex);
        if (matches && matches.length >= occurrence) {
            return matches[occurrence - 1].slice(1, -1); // Remove the brackets
        }
        return '';
    }

    // Function to set the value of a textarea by its ID
    function setTextareaValue(id, value) {
        const textarea = document.getElementById(id);
        if (textarea) {
            textarea.value = value;
        }
    }

    // Function to replace a placeholder in a textarea with a specific name
    function replacePlaceholderInTextarea(textareaName, placeholder, replacement) {
        const textarea = document.querySelector(`textarea[name="${textareaName}"]`);
        if (textarea) {
            const text = textarea.value;
            const regex = new RegExp(placeholder, "g");
            const newText = text.replace(regex, replacement);
            textarea.value = newText;
        }
    }

    // Function to replace a placeholder in an input field with a specific name
    function replacePlaceholderInInput(inputName, placeholder, replacement) {
        const inputField = document.querySelector(`input[name="${inputName}"]`);
        if (inputField) {
            inputField.value = inputField.value.replace(placeholder, replacement);
        }
    }

    // Read user inputs from the clipboard
    navigator.clipboard.readText().then(function(clipboardText) {
        const clipboardLines = clipboardText.split('\n');
        const userinput1 = clipboardLines[0] || '';
        const userinput4 = clipboardLines[1] || '';
        const userinput3 = clipboardLines[2] || '';
        const userinput7 = clipboardLines[3] || '';

        // Define predefined values for userinputs 8 to 23
        const userinput5 = `Deployment project of ${userinput3} at ${userinput1}`; // Predefined input for 05_justification_for_change_and_purpose_of_project
        const userinput6 = "No"; // Predefined input for 06_Is_this_MCM_a_continuation_of_a_previous_MCM_if_yes_list_them_below_and_attach_them_in_related_items
        const userinput9 = "As per RSPC ticket, provided by DCEO"; // Predefined input for 09_Power_Prep_and_Power_up_ticket
        const userinput10 = "N/A"; // Predefined input for 10_NARG_tickets_Link
        const userinput11 = "See attached cutsheet"; // Predefined input for 11_number_of_affected_devices
        const userinput12 = "See attached cutsheet"; // Predefined input for 12_Quantity_Manufacturer_Model_rack_position
        const userinput13 = "No"; // Predefined input for 13_is_two_person_verification_required_for_this_activity_if_yes_explain
        const userinput14 = "N/A"; // Predefined input for 14_alias_of_Performer
        const userinput15 = "N/A"; // Predefined input for 15_alias_of_Verifier
        const userinput16 = "See attached cutsheet"; // Predefined input for 16_list_all_hostnames_locations_production_status_and_if_in_scope_of_this_activity
        const userinput17 = "normal business hour for HW installation"; // Predefined input for 17_why_is_this_the_correct_time_and_day_to_complete_the_mcm
        const userinput18 = "No"; // Predefined input for 18_are_there_any_related_MCMs_that_must_be_completed_before_this_change_occurs
        const userinput19 = "N/A, this is HW installation based on RSPC"; // Predefined input for 19_are_the_Cut_sheet_MCMs_in_a_fully_approved_state_if_yes_list_them_below_and_attach_them_in_related_items
        const userinput20 = "non-intrusive"; // Predefined input for 20_if_this_MCM_is_intrusive_what_services_will_be_affected
        const userinput21 = "Yes"; // Predefined input for 21_have_we_segmented_this_change_into_small_enough_stages_to_minimize_the_blast_radius_accelerate_impact_detection_and_ease_rollback
        const userinput22 = "New Rack Deployments within Edge sites (w/o connecting to live devices/panels) is Tier 4 as per wiki:\n https://w.amazon.com/bin/view/GlobalEdge/Documentation/MCM/"; // Predefined input for 22_what_is_the_justification_for_this_tier_level
        const userinput23 = "1. Vendor will unpack all Loose Gears and bring into cage;\n2. If it's integrated rack, EDGE POC will work with transporatation/vendor to push it to location as per RSPC ticket\n3. Vendor will install all devices as per instructed by EDGE POC;\n4. Vendor will wait for EDGE POC to confirm to status of HW installed;\n5. Vendor will remove all rubbish from cage at the end of the day."; // Predefined input for 23_list_every_step_that_you_will_take_during_your_activity
        const userinput24 = "Impact could cause an outage to neighboring devices within the rack as listed in the Hostname section."; // Predefined input for 24_what_could_happen_if_this_change_causes_impact
        const userinput25 = "Hardware will be installed in a rack position that is potentially live. Extreme care will be used to prevent impact to any neighboring devices."; // Predefined input for 25_where_are_the_most_likely_places_this_change_will_fail
        const userinput26 = "1.) In the event that impact is detected by EDGE OPS oncall, EDGE Projects will immediately halt work.\n2.) Edge Projects will standby for directions provided by EDGE OPS oncall to assist in mitigation of impact.\n3.) EDGE Projects will perform said directed activities and inform EDGE OPS oncall of expected recovery.\n4.) EDGE Projects will then confirm recovery and re-evaluate if work can re-continue alongside EDGE OPS."; // Predefined input for 26_describe_rollback_plan

         // Define userinput2 based on userinput3 content
        let userinput2;
        if (userinput3.toLowerCase().includes("fnc") || userinput3.toLowerCase().includes("bwit") || userinput3.toLowerCase().includes("homestead") ||
            userinput3.toLowerCase().includes("bmn") || userinput3.toLowerCase().includes("ubiquity") || userinput3.toLowerCase().includes("optical")) {
            userinput2 = "border";
        } else if (userinput3.toLowerCase().includes("dx")) {
            userinput2 = "DX";
        } else if (userinput3.toLowerCase().includes("lci")) {
            userinput2 = "border"; // Define userinput2 as "border" for LCI
        } else if (userinput3.toLowerCase().includes("p1") || userinput3.toLowerCase().includes("p2") || userinput3.toLowerCase().includes("p3") ||
            userinput3.toLowerCase().includes("p4") || userinput3.toLowerCase().includes("p5") || userinput3.toLowerCase().includes("p6") ||
            userinput3.toLowerCase().includes("p7") || userinput3.toLowerCase().includes("p8") || userinput3.toLowerCase().includes("p9") ||
            userinput3.toLowerCase().includes("cf") || userinput3.toLowerCase().includes("r53") || userinput3.toLowerCase().includes("bwie")) {
            userinput2 = "CF";
        } else {
            userinput2 = "other";
        }

        // Set values in textareas by their IDs ==> this is for template info area
            setTextareaValue('templateVariables[{{01_site}}]', userinput1);
            setTextareaValue('templateVariables[{{02_fabric_or_service_name}}]', userinput2);
            setTextareaValue('templateVariables[{{03_project_name}}]', userinput3);
            setTextareaValue('templateVariables[{{04_FBN}}]', userinput4);
            setTextareaValue('templateVariables[{{05_justification_for_change_and_purpose_of_project}}]', userinput5);
            setTextareaValue('templateVariables[{{06_Is_this_MCM_a_continuation_of_a_previous_MCM_if_yes_list_them_below_and_attach_them_in_related_items}}]', userinput6);
            setTextareaValue('templateVariables[{{07_primary_sim_URL}}]', userinput7);
            setTextareaValue('templateVariables[{{09_Power_Prep_and_Power_up_ticket}}]', userinput9);
            setTextareaValue('templateVariables[{{10_NARG_tickets_Link}}]', userinput10);
            setTextareaValue('templateVariables[{{11_number_of_affected_devices}}]', userinput11);
            setTextareaValue('templateVariables[{{12_Quantity_Manufacturer_Model_rack_position}}]', userinput12);
            setTextareaValue('templateVariables[{{13_is_two_person_verification_required_for_this_activity_if_yes_explain}}]', userinput13);
            setTextareaValue('templateVariables[{{14_alias_of_Performer}}]', userinput14);
            setTextareaValue('templateVariables[{{15_alias_of_Verifier}}]', userinput15);
            setTextareaValue('templateVariables[{{16_list_all_hostnames_locations_production_status_and_if_in_scope_of_this_activity}}]', userinput16);
            setTextareaValue('templateVariables[{{17_why_is_this_the_correct_time_and_day_to_complete_the_mcm}}]', userinput17);
            setTextareaValue('templateVariables[{{18_are_there_any_related_MCMs_that_must_be_completed_before_this_change_occurs}}]', userinput18);
            setTextareaValue('templateVariables[{{19_are_the_Cut_sheet_MCMs_in_a_fully_approved_state_if_yes_list_them_below_and_attach_them_in_related_items}}]', userinput19);
            setTextareaValue('templateVariables[{{20_if_this_MCM_is_intrusive_what_services_will_be_affected}}]', userinput20);
            setTextareaValue('templateVariables[{{21_have_we_segmented_this_change_into_small_enough_stages_to_minimize_the_blast_radius_accelerate_impact_detection_and_ease_rollback}}]', userinput21);
            setTextareaValue('templateVariables[{{22_what_is_the_justification_for_this_tier_level}}]', userinput22);
            setTextareaValue('templateVariables[{{23_list_every_step_that_you_will_take_during_your_activity}}]', userinput23);
            setTextareaValue('templateVariables[{{24_what_could_happen_if_this_change_causes_impact}}]', userinput24);
            setTextareaValue('templateVariables[{{25_where_are_the_most_likely_places_this_change_will_fail}}]', userinput25);
            setTextareaValue('templateVariables[{{26_describe_rollback_plan}}]', userinput26);

        // Replace placeholders with specific names in textareas  ==> this is for MCM description area
            replacePlaceholderInTextarea('description', '{{01_site}}', userinput1);
            replacePlaceholderInTextarea('description', '{{02_fabric_or_service_name}}', userinput2);
            replacePlaceholderInTextarea('description', '{{03_project_name}}', userinput3);
            replacePlaceholderInTextarea('description', '{{04_FBN}}', userinput4);
            replacePlaceholderInTextarea('description', '{{05_justification_for_change_and_purpose_of_project}}', userinput5);
            replacePlaceholderInTextarea('description', '{{06_Is_this_MCM_a_continuation_of_a_previous_MCM_if_yes_list_them_below_and_attach_them_in_related_items}}', userinput6);
            replacePlaceholderInTextarea('description', '{{07_primary_sim_URL}}', userinput7);
            replacePlaceholderInTextarea('description', '{{09_Power_Prep_and_Power_up_ticket}}', userinput9);
            replacePlaceholderInTextarea('description', '{{10_NARG_tickets_Link}}', userinput10);
            replacePlaceholderInTextarea('description', '{{11_number_of_affected_devices}}', userinput11);
            replacePlaceholderInTextarea('description', '{{12_Quantity_Manufacturer_Model_rack_position}}', userinput12);
            replacePlaceholderInTextarea('description', '{{13_is_two_person_verification_required_for_this_activity_if_yes_explain}}', userinput13);
            replacePlaceholderInTextarea('description', '{{14_alias_of_Performer}}', userinput14);
            replacePlaceholderInTextarea('description', '{{15_alias_of_Verifier}}', userinput15);
            replacePlaceholderInTextarea('description', '{{16_list_all_hostnames_locations_production_status_and_if_in_scope_of_this_activity}}', userinput16);
            replacePlaceholderInTextarea('description', '{{17_why_is_this_the_correct_time_and_day_to_complete_the_mcm}}', userinput17);
            replacePlaceholderInTextarea('description', '{{18_are_there_any_related_MCMs_that_must_be_completed_before_this_change_occurs}}', userinput18);
            replacePlaceholderInTextarea('description', '{{19_are_the_Cut_sheet_MCMs_in_a_fully_approved_state_if_yes_list_them_below_and_attach_them_in_related_items}}', userinput19);
            replacePlaceholderInTextarea('description', '{{20_if_this_MCM_is_intrusive_what_services_will_be_affected}}', userinput20);
            replacePlaceholderInTextarea('description', '{{21_have_we_segmented_this_change_into_small_enough_stages_to_minimize_the_blast_radius_accelerate_impact_detection_and_ease_rollback}}', userinput21);
            replacePlaceholderInTextarea('description', '{{22_what_is_the_justification_for_this_tier_level}}', userinput22);
            replacePlaceholderInTextarea('description', '{{23_list_every_step_that_you_will_take_during_your_activity}}', userinput23);
            replacePlaceholderInTextarea('description', '{{24_what_could_happen_if_this_change_causes_impact}}', userinput24);
            replacePlaceholderInTextarea('description', '{{25_where_are_the_most_likely_places_this_change_will_fail}}', userinput25);
            replacePlaceholderInTextarea('description', '{{26_describe_rollback_plan}}', userinput26);

        // Replace {{01_site}} in the input field with name "title"  ==> this is for MCM title area
        replacePlaceholderInInput('title', '{{01_site}}', userinput1);
        replacePlaceholderInInput('title', '{{02_fabric_or_service_name}}', userinput2);
        replacePlaceholderInInput('title', '{{03_project_name}}', userinput3);
        replacePlaceholderInInput('title', '{{04_FBN}}', userinput4);

        // Display a final reminder alert
        alert("Don't forget to do following manual tasks:\nA) Double check the above information before submitting for approval\nB) Update 8_RSPC ticket");
    });
})();
