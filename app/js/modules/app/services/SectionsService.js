define(function(){
    return ['SessionUser', 'MENU_GROUPS', SectionsService];

    function SectionsService(SessionUser, MENU_GROUPS){

        function flatternSection(){
            var flatternedSections = [];
            _.each(MENU_GROUPS, function(menu){
                if(_.has(menu, 'subMenus')){
                    flatternedSections = flatternedSections.concat(menu.subMenus);
                } else {
                    flatternedSections.push(menu);
                }
            });
            return flatternedSections;
        }
        return {
            activeSections: [],
            activeSection: {},
            flatternSection: flatternSection(),
            initActiveSection: function(){
                var self = this;
                if(!self.activeSections.length || !self.activeSection){
                    if(localStorage.getItem(sessionStorage.getItem('username') + '-activeSections')){
                        self.activeSections = _.filter(flatternSection(), localStorage.getItem(sessionStorage.getItem('username') + '-activeSections'));
                        self.activeSection = _.filter(flatternSection(), {isActive: localStorage.getItem(sessionStorage.getItem('username') + '-activeSection')})[0];
                    } else  {
                        self.activeSections.push(_.filter(flatternSection(), 'default')[0]);
                        self.activeSection.item = _.filter(flatternSection(), 'default')[0];
                    }
                }
            },
            addActiveSection: function(section){
                var self = this;
                if(!_.find(self.activeSections, {id: section.id})){
                    self.activeSections.push(section);
                }
                self.activeSection.item = section;
            },
            closeActiveSection: function(section){
                var self = this;
                _.remove(self.activeSections, function(activeSection){
                    return activeSection.id === section.id;
                });
            }
        };
    }
});