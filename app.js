let data = [
    {
        "title": "Work",
        "timeframes": {
            "daily": {
                "current": 5,
                "previous": 7
            },
            "weekly": {
                "current": 32,
                "previous": 36
            },
            "monthly": {
                "current": 103,
                "previous": 128
            }
        }
    },
    {
        "title": "Play",
        "timeframes": {
            "daily": {
                "current": 1,
                "previous": 2
            },
            "weekly": {
                "current": 10,
                "previous": 8
            },
            "monthly": {
                "current": 23,
                "previous": 29
            }
        }
    },
    {
        "title": "Study",
        "timeframes": {
            "daily": {
                "current": 0,
                "previous": 1
            },
            "weekly": {
                "current": 4,
                "previous": 7
            },
            "monthly": {
                "current": 13,
                "previous": 19
            }
        }
    },
    {
        "title": "Exercise",
        "timeframes": {
            "daily": {
                "current": 1,
                "previous": 1
            },
            "weekly": {
                "current": 4,
                "previous": 5
            },
            "monthly": {
                "current": 11,
                "previous": 18
            }
        }
    },
    {
        "title": "Social",
        "timeframes": {
            "daily": {
                "current": 1,
                "previous": 3
            },
            "weekly": {
                "current": 5,
                "previous": 10
            },
            "monthly": {
                "current": 21,
                "previous": 23
            }
        }
    },
    {
        "title": "Self Care",
        "timeframes": {
            "daily": {
                "current": 0,
                "previous": 1
            },
            "weekly": {
                "current": 2,
                "previous": 2
            },
            "monthly": {
                "current": 7,
                "previous": 11
            }
        }
    }
]

const buttons = document.querySelectorAll('.user__time');

const activeClickedButton = (button) => {
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
}

const clearActivities = () => {
    const activities = document.querySelectorAll('.card');
    activities.forEach(a => a.remove());
}

const renderCards = (clickedOption) => {
    clearActivities();
    const section = document.querySelector('section.container');

    const calcTimeframe = (option) => {
        if (option === 'daily') {
            return 'Yesterday'
        } else if (option === 'weekly') {
            return 'Last Week'
        } else if (option === 'monthly') {
            return 'Last Month'
        }
    }

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
            <h3 class="box__title">${activityClass}</h3>
            <img src="./images/icon-ellipsis.svg" alt="ellipsis">
          </div>
          <div class="card__hours">
            <h2 class="box__hours">${timeFrameData.current}hrs</h2>
            <p class="last__hours">${previousTimeframe} - ${timeFrameData.previous}hrs</p>
          </div>
        </div>
      `;
        article.innerHTML = stringToInject;
        section.append(article)

    })
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        activeClickedButton(button);
        const clickedOption = button.dataset.option;
        renderCards(clickedOption);
    })
})

buttons[1].click();