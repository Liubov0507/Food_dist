function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
     //Табы Tabs
     const tabs = document.querySelectorAll(tabsSelector),
           tabsContent = document.querySelectorAll(tabsContentSelector),
           tabsParent = document.querySelector(tabsParentSelector);

    //функция скрытия табов и удаления класса активности
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    //функция показа табов
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
        
    hideTabContent();
    showTabContent();

    //функция на родителе
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;