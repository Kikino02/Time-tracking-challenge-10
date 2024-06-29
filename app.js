const buttons = document.querySelectorAll('.user__time');

const activeClickedButton = (button) => {
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
};

const clearActivities = () => {
    const activities = document.querySelectorAll('.card');
    activities.forEach(a => a.remove());
};

const renderCards = (data, clickedOption) => {
    clearActivities();
    const section = document.querySelector('section.container');

    const calcTimeframe = (option) => {
        if (option === 'daily') {
            return 'Yesterday';
        } else if (option === 'weekly') {
            return 'Last Week';
        } else if (option === 'monthly') {
            return 'Last Month';
        }
    };

    data.forEach(activity => {
        const name = activity.title;
        const activityClass = name.toLowerCase().replace(' ', '-');
        const timeFrameData = activity.timeframes[clickedOption];
        const previousTimeframe = calcTimeframe(clickedOption);
        const article = document.createElement('article');
        article.classList.add('card', activityClass);
        const stringToInject = `
      <div class="inner-box">
        <div class="box__top">
          <h3 class="box__title">${name}</h3>
          <img src="./images/icon-ellipsis.svg" alt="ellipsis">
        </div>
        <div class="card__hours">
          <h2 class="box__hours">${timeFrameData.current}hrs</h2>
          <p class="last__hours">${previousTimeframe} - ${timeFrameData.previous}hrs</p>
        </div>
      </div>
    `;
        article.innerHTML = stringToInject;
        section.append(article);
    });
};

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                activeClickedButton(button);
                const clickedOption = button.dataset.option;
                renderCards(data, clickedOption);
            });
        });

        // Trigger a click on the first button to initialize
        buttons[0].click();
    })
    .catch(error => console.error('Error fetching data:', error));