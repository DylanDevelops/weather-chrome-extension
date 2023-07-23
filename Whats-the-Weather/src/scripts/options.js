// sets background color of settings depending on if you are using light or dark mode
function updateColorScheme(e) {
    const isDarkMode = e.matches;
    const root = document.documentElement;
    if (isDarkMode) {
        // is dark mode
        root.style.setProperty('--text-color', '#fff');
        root.style.setProperty('--background-color', '#222');
    } else {
        // is not dark mode
        root.style.setProperty('--text-color', '#222');
        root.style.setProperty('--background-color', '#fff');
    }
}

// Check the user's preferred color scheme on load
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
updateColorScheme({ matches: isDarkMode });

// Watch for changes in the user's preferred color scheme and update styles accordingly
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateColorScheme);

// saves options to chrome storage
const saveOptions = () => {
    var possibleDegreeOptions = document.getElementsByName('degree-unit');
    let degree;
    for(i = 0; i < possibleDegreeOptions.length; i++) {
        if(possibleDegreeOptions[i].checked) {
            degree = possibleDegreeOptions[i].id;
        }
    }

    // store data
    chrome.storage.sync.set(
        { tempUnit: degree },
        () => {
            //update status to let user know options were saved
            const status = document.getElementById('save');
            status.textContent = 'Saved!';
            status.style.fontStyle = 'italic';
            setTimeout(() => {
                status.textContent = 'Save';
                status.style.fontStyle = 'normal';
            }, 750);
        }
    );
};

// Restores select box and checkbox state using the preferences store in chrome.storage
const restoreOptions = () => {
    chrome.storage.sync.get(
        { tempUnit: 'Imperial' },
        (storedItems) => {
            var possibleDegreeOptions = document.getElementsByName('degree-unit');
            for(i = 0; i < possibleDegreeOptions.length; i++) {
                if(possibleDegreeOptions[i].id == storedItems.tempUnit) {
                   possibleDegreeOptions[i].checked = true;
                }
            }
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);