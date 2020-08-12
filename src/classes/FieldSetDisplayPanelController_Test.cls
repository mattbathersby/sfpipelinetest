@isTest(seealldata=false)
public with sharing class FieldSetDisplayPanelController_Test {
    
    private static testmethod void getFieldNames_test() {
        Test.startTest();
        List<String> fieldNames = FieldSetDisplayPanelController.getFieldNames('Fake_Field_Set', 'Account');
        Test.stopTest();
    }

}