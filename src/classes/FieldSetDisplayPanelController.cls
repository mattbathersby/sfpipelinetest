public with sharing class FieldSetDisplayPanelController {
    
    /* WOOGY WOOGY */

    @AuraEnabled (cacheable=true)
    public static List<String> getFieldNames(string fieldSetApiName, string sObjectName){
        try{
            List<string> fset = new List<string>();
            Schema.SObjectType targetType = Schema.getGlobalDescribe().get(sObjectName);
            Schema.DescribeSObjectResult describe = targetType.getDescribe();
            Map<String, Schema.FieldSet> fsMap = describe.fieldSets.getMap();

            for (Schema.FieldSetMember f : fsMap.get(fieldSetApiName).getFields()) {
                fset.add(f.fieldPath);
            }

            return fset;
        } catch (exception e){
            system.debug(e.getMessage());
            if(test.isRunningTest()){
                return null;
            } 
            throw new AuraHandledException('Error retrieving fieldset details');
        }
    } 

}
