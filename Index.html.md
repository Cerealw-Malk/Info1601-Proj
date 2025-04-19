```
<!DOCTYPE html>
<script>
    function showTemplateExercises(templateName, exercises) {
        const modalContent = `
            <div class="modal-content">
                <h2>${templateName} Exercises</h2>
                <ul>
                    ${exercises.map(exercise => `<li>${exercise}</li>`).join('')}
                </ul>
                <button onclick="closeTemplateModal()">Close</button>
            </div>
        `;
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = modalContent;
        modal.style.display = 'block';
        modal.id = 'template-modal';
        document.body.appendChild(modal);
    }

    function closeTemplateModal() {
        const modal = document.getElementById('template-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Add these functions to your existing JavaScript
    let selectedTemplateExercises = [];

    function showAddTemplateModal() {
        const modal = document.getElementById('add-template-modal');
        modal.style.display = 'flex';
        renderTemplateExerciseList();
    }

    function closeAddTemplateModal() {
        const modal = document.getElementById('add-template-modal');
        modal.style.display = 'none';
        selectedTemplateExercises = [];
        document.getElementById('template-name').value = '';
    }

    function renderTemplateExerciseList() {
        const searchTerm = document.getElementById('template-exercise-search')?.value?.toLowerCase() || '';
        const listContainer = document.getElementById('template-exercise-list');
        
        const filteredExercises = exercises.filter(exercise => 
            exercise.name.toLowerCase().includes(searchTerm)
        );
        
        listContainer.innerHTML = filteredExercises.map(exercise => `
            <div class="exercise-item">
                <div class="exercise-content" onclick="addExerciseToTemplate('${exercise.name}')">
                    <h3 class="font-semibold">${exercise.name}</h3>
                    <p class="text-sm text-muted">Target: ${exercise.target} | Category: ${exercise.category}</p>
                </div>
            </div>
        `).join('');
    }

    function addExerciseToTemplate(exerciseName) {
        if (!selectedTemplateExercises.includes(exerciseName)) {
            selectedTemplateExercises.push(exerciseName);
            renderSelectedTemplateExercises();
        }
    }

    function removeExerciseFromTemplate(exerciseName) {
        selectedTemplateExercises = selectedTemplateExercises.filter(name => name !== exerciseName);
        renderSelectedTemplateExercises();
    }

    function renderSelectedTemplateExercises() {
        const container = document.getElementById('selected-template-exercises');
        container.innerHTML = selectedTemplateExercises.map(exerciseName => `
            <div class="selected-exercise">
                <span>${exerciseName}</span>
                <button onclick="removeExerciseFromTemplate('${exerciseName}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    function saveTemplate() {
        const templateName = document.getElementById('template-name').value.trim();
        
        if (!templateName) {
            alert('Please enter a template name');
            return;
        }
        
        if (selectedTemplateExercises.length === 0) {
            alert('Please select at least one exercise');
            return;
        }
        
        // Save the template (you can implement storage logic here)
        const template = {
            name: templateName,
            exercises: selectedTemplateExercises
        };
        
        // Store in localStorage (you can modify this to use your preferred storage method)
        const templates = JSON.parse(localStorage.getItem('customTemplates') || '[]');
        templates.push(template);
        localStorage.setItem('customTemplates', JSON.stringify(templates));
        
        closeAddTemplateModal();
        // Optionally refresh the templates display
        loadCustomTemplates();
    }

    // Update the existing showTemplateCreator function
    function showTemplateCreator() {
        showAddTemplateModal();
    }

    // Add event listener for search input
    document.getElementById('template-exercise-search')?.addEventListener('input', renderTemplateExerciseList);

    function editProfile() {
        const profileModal = document.createElement('div');
        profileModal.className = 'modal show';
        profileModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Edit Profile</h2>
                    <button class="close-btn" onclick="closeEditProfileModal()">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="edit-username">Username</label>
                        <input type="text" id="edit-username" value="${currentUser?.username || ''}" />
                    </div>
                    <div class="form-group">
                        <label for="edit-email">Email</label>
                        <input type="email" id="edit-email" value="${currentUser?.email || ''}" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="saveProfileChanges()">Save Changes</button>
                </div>
            </div>
        `;
        document.body.appendChild(profileModal);
    }

    function closeEditProfileModal() {
        const modal = document.querySelector('.modal.show');
        if (modal) modal.remove();
    }

    function saveProfileChanges() {
        const newUsername = document.getElementById('edit-username').value.trim();
        const newEmail = document.getElementById('edit-email').value.trim();

        if (!newUsername || !newEmail) {
            alert('Please fill in all fields.');
            return;
        }

        if (currentUser) {
            currentUser.username = newUsername;
            currentUser.email = newEmail;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUserUI();
            closeEditProfileModal();
            alert('Profile updated successfully.');
        } else {
            alert('No user is logged in.');
        }
    }
</script>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gymmetry - Workout Tracker</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <style>
        /* CSS Variables */
        :root {
            --background: #ffffff;
            --foreground: #0f172a;
            --primary: #3b82f6;
            --primary-foreground: #ffffff;
            --secondary: #f1f5f9;
            --secondary-foreground: #0f172a;
            --muted: #f1f5f9;
            --muted-foreground: #64748b;
            --accent: #f1f5f9;
            --accent-foreground: #0f172a;
            --destructive: #ef4444;
            --destructive-foreground: #ffffff;
            --border: #e2e8f0;
            --input: #e2e8f0;
            --ring: #3b82f6;
            --radius: 0.5rem;
        }

        /* Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: var(--secondary);
            color: var(--foreground);
            line-height: 1.5;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        a {
            color: inherit;
            text-decoration: none;
        }

        button {
            cursor: pointer;
            font-family: inherit;
        }

        /* Container */
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Header */
        header {
            background-color: var(--background);
            border-bottom: 1px solid var(--border);
            position: sticky;
            top: 0;
            z-index: 10;
            padding: 0.5rem 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 3.5rem;
        }

        .logo {
            font-size: 1.75rem;
            font-weight: 700;
            margin-right: 2rem;
        }

        .main-nav {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .nav-link {
            padding: 0.75rem 1.25rem;
            border-radius: var(--radius);
            font-size: 1rem;
            font-weight: 500;
            transition: background-color 0.2s ease, color 0.2s ease;
            position: relative;
        }

        .nav-link:hover {
            background-color: var(--muted);
        }

        .nav-link.active {
            background-color: var(--primary);
            color: var(--primary-foreground);
            font-weight: 600;
        }

        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -0.75rem;
            left: 50%;
            transform: translateX(-50%);
            width: 24px;
            height: 3px;
            background-color: var(--primary);
            border-radius: 2px;
        }

        .user-profile {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-left: 2rem;
            position: relative;
        }

        .avatar {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 9999px;
            background-color: var(--primary);
            color: var(--primary-foreground);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 1.25rem;
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        .avatar:hover {
            transform: scale(1.05);
        }

        .login-status {
            font-size: 1rem;
            color: var(--muted-foreground);
            font-weight: 500;
        }

        .mobile-menu-btn {
            display: none;
            align-items: center;
            justify-content: center;
            width: 3rem;
            height: 3rem;
            border: none;
            background: transparent;
            color: var(--foreground);
        }

        /* Profile Popup */
        .profile-popup {
            position: absolute;
            right: 0;
            top: 100%;
            margin-top: 0.5rem;
            width: 12rem;
            background-color: var(--background);
            border-radius: var(--radius);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            z-index: 50;
            overflow: hidden;
            animation: fadeIn 0.2s ease-out;
        }

        .profile-popup-item {
            display: block;
            width: 100%;
            padding: 0.5rem 1rem;
            text-align: left;
            font-size: 0.875rem;
            color: var(--foreground);
            background: none;
            border: none;
            transition: background-color 0.2s ease;
        }

        .profile-popup-item:hover {
            background-color: var(--muted);
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Mobile Menu */
        .mobile-menu {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 250px;
            background-color: var(--background);
            z-index: 40;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
            padding: 1rem;
        }

        .mobile-menu.open {
            transform: translateX(0);
        }

        .mobile-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .mobile-menu-close {
            background: transparent;
            border: none;
            font-size: 1.5rem;
            color: var(--foreground);
        }

        .mobile-nav {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .mobile-nav .nav-link {
            padding: 0.75rem 1rem;
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 30;
            display: none;
        }

        .overlay.open {
            display: block;
        }

        /* Main Content */
        main {
            padding-top: 0.25rem;
        }

        .page {
            display: none;
        }

        .page.active {
            display: block;
        }

        /* Page Headers */
        .page-header {
            margin-bottom: 0.5rem;
            padding: 0 1rem;
        }

        .page-title {
            font-size: 1.875rem;
            font-weight: 700;
        }

        /* Cards */
        .card {
            background-color: var(--background);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            overflow: hidden;
        }

        .card-header {
            padding: 1rem;
            border-bottom: 1px solid var(--border);
        }

        .card-title {
            font-size: 1.25rem;
            font-weight: 600;
        }

        .card-content {
            padding: 1rem;
        }

        /* Buttons */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius);
            font-weight: 500;
            transition: background-color 0.2s ease, color 0.2s ease;
            padding: 0.5rem 1rem;
        }

        .btn-primary {
            background-color: var(--primary);
            color: var(--primary-foreground);
            border: none;
        }

        .btn-primary:hover {
            background-color: #2563eb;
        }

        .btn-outline {
            background-color: transparent;
            border: 1px solid var(--border);
        }

        .btn-outline:hover {
            background-color: var(--muted);
        }

        .btn-lg {
            padding: 0.75rem 1.5rem;
            font-size: 1.125rem;
        }

        .btn-block {
            width: 100%;
        }

        /* Grid */
        .grid {
            display: grid;
            gap: 1rem;
        }

        .grid-cols-1 {
            grid-template-columns: repeat(1, 1fr);
        }

        /* Media Queries */
        @media (max-width: 1023px) {
            .main-nav {
                display: none;
            }
            
            .mobile-menu-btn {
                display: flex;
            }
        }

        @media (min-width: 768px) {
            .grid-cols-2 {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 1024px) {
            .grid-cols-3 {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        /* Utility Classes */
        .hidden {
            display: none !important;
        }

        .flex {
            display: flex;
        }

        .items-center {
            align-items: center;
        }

        .justify-between {
            justify-content: space-between;
        }

        .space-y-4 > * + * {
            margin-top: 1rem;
        }

        .mb-4 {
            margin-bottom: 1rem;
        }

        .mb-6 {
            margin-bottom: 1.5rem;
        }

        .text-center {
            text-align: center;
        }

        .text-muted {
            color: var(--muted-foreground);
        }

        /* Login Modal Styles */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(8px);
            z-index: 50;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            padding: 1rem;
        }

        .modal-content {
            width: 95%;
            max-width: 600px;
            max-height: 90vh;
            background: linear-gradient(145deg, #ffffff, #f8fafc);
            border-radius: 12px;
            box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
            position: relative;
            transform: scale(0.95) translateY(-30px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            flex-direction: column;
        }

        .exercise-modal-content {
            padding: 1.5rem;
            overflow-y: auto;
            flex: 1;
            scroll-behavior: smooth;
            scrollbar-width: thin;
            scrollbar-color: var(--primary) transparent;
        }

        .exercise-modal-content::-webkit-scrollbar {
            width: 6px;
        }

        .exercise-modal-content::-webkit-scrollbar-track {
            background: transparent;
        }

        .exercise-modal-content::-webkit-scrollbar-thumb {
            background-color: var(--primary);
            border-radius: 3px;
        }

        .exercise-modal-header {
            background: linear-gradient(145deg, #ffffff, #f8fafc);
            padding: 1.5rem 1.5rem 0;
            margin: -1.5rem -1.5rem 1.5rem;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        }

        .exercise-tabs {
            background: var(--muted);
            padding: 0.5rem;
            margin: 0 0 1.5rem 0;
            border-radius: 8px;
            display: flex;
            gap: 1rem;
        }

        .exercise-tab-content {
            display: none;
            padding-top: 1rem;
        }

        .exercise-tab-content.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }

        .modal.show {
            opacity: 1;
            visibility: visible;
        }

        .modal.show .modal-content {
            transform: scale(1) translateY(0);
            opacity: 1;
        }

        .close-button {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: transparent;
            border: none;
            color: var(--muted-foreground);
            padding: 0.5rem;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 2;
        }

        .auth-container {
            padding: 2rem;
            position: relative;
        }

        .auth-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .auth-subtitle {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--foreground);
            margin-bottom: 0.5rem;
        }

        .auth-tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            background-color: var(--muted);
            padding: 0.5rem;
            border-radius: var(--radius);
        }

        .tab-button {
            flex: 1;
            padding: 0.75rem 1.5rem;
            border: none;
            background: transparent;
            color: var(--muted-foreground);
            font-weight: 500;
            border-radius: var(--radius);
            transition: all 0.3s ease;
        }

        .tab-button.active {
            background-color: white;
            color: var(--foreground);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--foreground);
            margin-bottom: 0.5rem;
        }

        .form-group input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            background-color: white;
            transition: all 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .primary-button {
            width: 100%;
            padding: 0.75rem 1.5rem;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: var(--radius);
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .primary-button:hover {
            background-color: #2563eb;
            transform: translateY(-1px);
        }

        .auth-footer {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border);
            text-align: center;
        }

        .auth-footer-text {
            color: var(--muted-foreground);
            font-size: 0.875rem;
        }

        .auth-footer-link {
            color: var(--primary);
            font-weight: 500;
            cursor: pointer;
            margin-left: 0.25rem;
            transition: all 0.2s ease;
        }

        .auth-footer-link:hover {
            text-decoration: underline;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Toast Notification */
        #toast {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            background-color: white;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 1rem;
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            max-width: 24rem;
            transform: translateY(0.5rem);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 100;
        }

        #toast.show {
            transform: translateY(0);
            opacity: 1;
        }

        #toast-icon {
            flex-shrink: 0;
        }

        #toast-icon.success {
            color: #10b981;
        }

        #toast-icon.error {
            color: #ef4444;
        }

        #toast-content {
            flex: 1;
        }

        #toast-title {
            font-weight: 600;
            margin-bottom: 0.25rem;
        }

        #toast-message {
            font-size: 0.875rem;
            color: var(--muted-foreground);
        }

        #close-toast {
            flex-shrink: 0;
            color: var(--muted-foreground);
            background: none;
            border: none;
            padding: 0.25rem;
        }

        /* Exercises Controls */
        .exercises-controls {
            position: sticky;
            top: 4.25rem;
            background-color: var(--background);
            padding: 0.5rem;
            border-radius: var(--radius);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 0.5rem;
            z-index: 5;
            border: 1px solid var(--border);
        }

        .search-wrapper {
            position: relative;
            margin-bottom: 1rem;
        }

        .search-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--muted-foreground);
        }

        #exercise-search {
            padding: 0.75rem 1rem 0.75rem 2.5rem;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            width: 100%;
            font-size: 1rem;
            transition: border-color 0.2s ease;
        }

        #exercise-search:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .filters-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1rem;
            align-items: center;
        }

        .filters-wrapper select,
        .filters-wrapper button {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            background-color: white;
            font-size: 1rem;
            transition: all 0.2s ease;
            cursor: pointer;
        }

        .filters-wrapper button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .filters-wrapper button i {
            font-size: 1rem;
        }

        .filters-wrapper button.active {
            background-color: var(--primary);
            color: white;
            border-color: var(--primary);
        }

        .filters-wrapper button:hover {
            background-color: var(--muted);
        }

        .filters-wrapper button.active:hover {
            background-color: #2563eb;
        }

        #exercises-content {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 0 1rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        #exercises-list {
            padding-top: 0.5rem;
        }

        /* Exercise Item Styles */
        .exercise-item {
            background-color: white;
            border-radius: var(--radius);
            padding: 1rem;
            transition: all 0.2s ease;
            border: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }

        .exercise-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .exercise-content {
            flex-grow: 1;
            cursor: pointer;
        }

        .bookmark-btn {
            background: none;
            border: none;
            padding: 0.5rem;
            cursor: pointer;
            color: var(--muted-foreground);
            transition: color 0.2s ease;
        }

        .bookmark-btn:hover {
            color: var(--primary);
        }

        .bookmark-btn i {
            font-size: 1.25rem;
        }

        .bookmark-btn i.text-primary {
            color: var(--primary);
        }

        #saved-exercises-toggle.active {
            background-color: var(--primary);
            color: var(--primary-foreground);
            border-color: var(--primary);
        }

        #saved-exercises-toggle.active:hover {
            background-color: #2563eb;
        }

        /* Exercise Modal Content */
        .exercise-modal-content {
            padding: 1.5rem;
        }

        .exercise-modal-header {
            margin-bottom: 1.5rem;
        }

        .exercise-tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
            background-color: var(--muted);
            padding: 0.5rem;
            border-radius: var(--radius);
        }

        .exercise-tab {
            flex: 1;
            padding: 0.75rem 1.5rem;
            border: none;
            background: transparent;
            color: var(--muted-foreground);
            font-weight: 500;
            border-radius: var(--radius);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .exercise-tab.active {
            background-color: white;
            color: var(--foreground);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .exercise-tab-content {
            display: none;
        }

        .exercise-tab-content.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }

        .tutorial-video {
            position: relative;
            width: 100%;
            background: var(--muted);
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 1.5rem;
            aspect-ratio: 16/9;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .tutorial-video:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .play-button {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            background: var(--primary);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            transition: all 0.3s ease;
        }

        .tutorial-video:hover .play-button {
            transform: scale(1.1);
        }

        .exercise-steps {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .exercise-step {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            margin-bottom: 0.5rem;
        }

        .step-number {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background: var(--primary);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            flex-shrink: 0;
        }

        .exercise-history {
            border: 1px solid var(--border);
            border-radius: 8px;
            overflow: hidden;
        }

        .history-entry {
            display: flex;
            justify-content: space-between;
            padding: 1rem;
            border-bottom: 1px solid var(--border);
            transition: background-color 0.2s ease;
        }

        .history-entry:last-child {
            border-bottom: none;
        }

        .history-entry:hover {
            background-color: var(--muted);
        }

        .history-date {
            color: var(--muted-foreground);
            font-size: 0.875rem;
        }

        .history-details {
            text-align: right;
        }

        .history-weight {
            font-weight: 600;
            color: var(--primary);
        }

        /* Workout Modal Styles */
        .workout-modal {
            max-width: 800px;
            max-height: 90vh;
            padding: 0;
        }

        .workout-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid var(--border);
            background-color: white;
        }

        .workout-date {
            font-size: 1.25rem;
            font-weight: 500;
        }

        .workout-timer {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        #timer-display {
            font-size: 1.5rem;
            font-weight: bold;
            font-family: monospace;
        }

        .workout-content {
            padding: 1rem;
            overflow-y: auto;
            max-height: calc(90vh - 80px);
        }

        .selected-exercise {
            background-color: white;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .exercise-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .sets-container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .set-row {
            display: grid;
            grid-template-columns: auto 100px 100px auto;
            gap: 1rem;
            align-items: center;
        }

        .set-number {
            color: var(--secondary-color);
        }

        .weight-input, .reps-input {
            padding: 0.5rem;
            border: 1px solid var(--border);
            border-radius: 4px;
            width: 100%;
        }

        .add-set-btn {
            margin-top: 0.5rem;
            color: var(--primary);
        }

        .workout-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }

        .btn-text {
            background: none;
            border: none;
            padding: 0.5rem;
            cursor: pointer;
            color: var(--secondary-color);
        }

        .btn-text.completed {
            color: var(--primary);
        }

        .add-exercise-btn {
            padding: 0.5rem 1rem;
        }

        /* Profile Page Styles */
        .profile-page {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .profile-header {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin-bottom: 3rem;
            background-color: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .profile-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background-color: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
            font-weight: bold;
        }

        .profile-info {
            flex: 1;
        }

        .profile-name {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--foreground);
        }

        .profile-stats {
            display: flex;
            gap: 2rem;
            margin-top: 1rem;
        }

        .stat-item {
            text-align: center;
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--primary);
        }

        .stat-label {
            font-size: 0.875rem;
            color: var(--muted-foreground);
        }

        .profile-sections {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .profile-section {
            background-color: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .section-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: var(--foreground);
            padding-bottom: 0.5rem;
            border-bottom: 2px solid var(--primary);
        }

        .bmi-calculator {
            display: grid;
            gap: 1rem;
        }

        .bmi-inputs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .bmi-result {
            text-align: center;
            padding: 1rem;
            background-color: var(--secondary);
            border-radius: 8px;
            margin-top: 1rem;
        }

        .bmi-value {
            font-size: 2rem;
            font-weight: 600;
            color: var(--primary);
        }

        .bmi-category {
            font-size: 1rem;
            color: var(--muted-foreground);
        }

        .goals-section textarea {
            width: 100%;
            min-height: 150px;
            padding: 1rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            resize: vertical;
            font-size: 1rem;
            margin-bottom: 1rem;
        }

        .save-goals-btn {
            background-color: var(--primary);
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s;
        }

        .save-goals-btn:hover {
            background-color: #2563eb;
        }

        .workout-history {
            margin-top: 2rem;
        }

        .history-entry {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid var(--border);
        }

        .history-entry:last-child {
            border-bottom: none;
        }

        .history-date {
            font-weight: 500;
            color: var(--foreground);
        }

        .history-details {
            text-align: right;
        }

        .history-weight {
            font-weight: 600;
            color: var(--primary);
        }

        @media (max-width: 768px) {
            .profile-header {
                flex-direction: column;
                text-align: center;
            }

            .profile-stats {
                justify-content: center;
            }

            .bmi-inputs {
                grid-template-columns: 1fr;
            }
        }

        .workout-summary {
            background-color: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-top: 2rem;
        }

        .summary-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--primary-color);
        }

        .summary-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-color);
        }

        .summary-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background-color: var(--background-color);
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--primary-color);
        }

        .stat-label {
            font-size: 0.875rem;
            color: var(--text-muted);
        }

        .exercise-summary {
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-color);
        }

        .exercise-summary:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        .exercise-name {
            font-weight: 500;
            margin-bottom: 0.5rem;
            display: flex;
        }

        .exercise-sets {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .set-item {
            background-color: var(--background-color);
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.875rem;
        }

        .finish-workout-btn {
            background-color: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1.125rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
            width: 100%;
            margin-top: 2rem;
        }

        .finish-workout-btn:hover {
            background-color: var(--primary-color-dark);
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <div class="header-content">
                <a href="#" class="logo" id="logo">Gymmetry</a>
                
                <!-- Desktop Navigation -->
                <nav class="main-nav">
                    <!--<a href="#profile" class="nav-link">Profile</a>-->
                    <a href="#history" class="nav-link">History</a>
                    <a href="#start-workout" class="nav-link active">Start Workout</a>
                    <a href="#exercises" class="nav-link">Exercises</a>
                </nav>
                
                <!-- Mobile Menu Button -->
                <button class="mobile-menu-btn" id="mobile-menu-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                
                <!-- User Profile -->
                <div class="user-profile" id="user-profile">
                    <div class="avatar" id="user-avatar">?</div>
                    <span class="login-status" id="login-status">Logged out</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobile-menu">
        <div class="mobile-menu-header">
            <span class="logo">Gymmetry</span>
            <button class="mobile-menu-close" id="mobile-menu-close">&times;</button>
        </div>
        <nav class="mobile-nav">
           <!-- <a href="#profile" class="nav-link">Profile</a> -->
            <a href="#history" class="nav-link">History</a>
            <a href="#start-workout" class="nav-link">Start Workout</a>
            <a href="#exercises" class="nav-link">Exercises</a>
        </nav>
    </div>
    <div class="overlay" id="overlay"></div>

    <!-- Main Content -->
    <main>
        <div class="container">
            <!-- Start Workout Page -->
            <div id="start-workout-page" class="page active">
                <div class="page-header">
                    <h1 class="page-title">Start Workout</h1>
                </div>

                <!-- Active Workout Section -->
                <div id="active-workout" class="workout-container hidden">
                    <div class="workout-header">
                        <div>
                            <div id="workout-date" class="workout-date"></div>
                            <div id="workout-timer" class="workout-timer">00:00:00</div>
                        </div>
                        <div class="workout-actions">
                            <button class="btn btn-outline" onclick="showExerciseSelector()">
                                <i class="fas fa-plus"></i>
                                Add Exercise
                            </button>
                            <button class="btn btn-primary" onclick="endCurrentWorkout()">
                                End Workout
                            </button>
                        </div>
                    </div>
                    <div id="current-exercises" class="current-exercises">
                        <!-- Current exercises will be added here -->
                    </div>
                </div>

                <!-- Quick Start Section -->
                <div id="workout-start" class="card mb-6">
                    <div class="card-header">
                        <h2 class="card-title">Quick Start</h2>
                    </div>
                    <div class="card-content">
                        <button id="start-empty-workout" class="btn btn-primary btn-lg btn-block" onclick="startEmptyWorkout()">
                            Start an Empty Workout
                        </button>
                    </div>
                </div>

                <!-- Templates Section -->
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="card-title">Your Templates</h2>
                        <button id="add-template-button" class="btn btn-outline" onclick="showTemplateCreator()">
                            <i class="fas fa-plus mr-2"></i>
                            Add New Template
                        </button>
                    </div>

                    <div id="templates-container" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Templates will be inserted here -->
                        <div class="card" id="no-templates-message">
                            <div class="card-content text-center">
                                <p class="text-muted">No custom templates yet. Create your first template!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Example Templates -->
                <div>
                    <h2 class="card-title mb-4">Example Templates</h2>
                    <div class="template-grid">
                        <div class="template-card">
                            <div class="template-header">
                                <h3 class="template-title">Legs Day</h3>
                                <div class="template-exercises">
                                    <span class="exercise-item-template">Leg Press</span>
                                    <span class="exercise-item-template">Standing Calf Raise</span>
                                    <span class="exercise-item-template">Lying Leg Curl</span>
                                </div>
                            </div>
                            <button class="btn btn-outline" onclick="startTemplateWorkout('legs')">Start Workout</button>
                        </div>
                        
                        <div class="template-card">
                            <div class="template-header">
                                <h3 class="template-title">Arms Day</h3>
                                <div class="template-exercises">
                                    <span class="exercise-item-template">Hammer Curl</span>
                                    <span class="exercise-item-template">Cable Curl with Rope</span>
                                    <span class="exercise-item-template">Tricep Pushdown</span>
                                </div>
                            </div>
                            <button class="btn btn-outline" onclick="startTemplateWorkout('arms')">Start Workout</button>
                        </div>

                        <div class="template-card">
                            <div class="template-header">
                                <h3 class="template-title">Chest Day</h3>
                                <div class="template-exercises">
                                    <span class="exercise-item-template">Bench Press</span>
                                    <span class="exercise-item-template">Incline DB Press</span>
                                    <span class="exercise-item-template">Cable Flyes</span>
                                </div>
                            </div>
                            <button class="btn btn-outline" onclick="startTemplateWorkout('chest')">Start Workout</button>
                        </div>

                        <div class="template-card">
                            <div class="template-header">
                                <h3 class="template-title">Back Day</h3>
                                <div class="template-exercises">
                                    <span class="exercise-item-template">Lat Pulldown</span>
                                    <span class="exercise-item-template">Barbell Row</span>
                                    <span class="exercise-item-template">Face Pull</span>
                                </div>
                            </div>
                            <button class="btn btn-outline" onclick="startTemplateWorkout('back')">Start Workout</button>
                        </div>

                        <div class="template-card">
                            <div class="template-header">
                                <h3 class="template-title">Full Body</h3>
                                <div class="template-exercises">
                                    <span class="exercise-item-template">Squat</span>
                                    <span class="exercise-item-template">Bench Press</span>
                                    <span class="exercise-item-template">Deadlift</span>
                                    <span class="exercise-item-template">Shoulder Press</span>
                                </div>
                            </div>
                            <button class="btn btn-outline" onclick="startTemplateWorkout('fullbody')">Start Workout</button>
                        </div>

                        <div class="template-card">
                            <div class="template-header">
                                <h3 class="template-title">Core Focus</h3>
                                <div class="template-exercises">
                                    <span class="exercise-item-template">Planks</span>
                                    <span class="exercise-item-template">Russian Twists</span>
                                    <span class="exercise-item-template">Ab Rollouts</span>
                                </div>
                            </div>
                            <button class="btn btn-outline" onclick="startTemplateWorkout('core')">Start Workout</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- History Page -->
            <div id="history-page" class="page">
                <div class="page-header">
                    <h1 class="page-title">Workout History</h1>
                </div>
                
                <div id="workout-history-container">
                    <!-- Workout history will be populated here -->
                </div>
                
                <div id="no-workouts-message" class="text-center space-y-4">
                    <p class="text-muted">No workouts performed. Completed workouts will appear here.</p>
                    <button id="history-start-workout" class="btn btn-primary" onclick="navigateTo('start-workout')">
                        Start Workout
                    </button>
                </div>
            </div>

            <!-- Profile Page -->
            <div id="profile-page" class="page">
                <h1 class="page-title">Profile</h1>
                
                <div class="profile-container">
                    <!-- User Info Section -->
                    <div class="profile-section">
                        <div class="profile-avatar">
                            <span id="profile-initial">S</span>
                        </div>
                        <div class="profile-username" id="profile-username">Username</div>
                        <div class="profile-email" id="profile-email">shariwylie@gmail.com</div>
                        <button class="logout-btn" onclick="logout()">
                            <i class="fas fa-sign-out-alt"></i> Log Out
                        </button>
                    </div>

                    <!-- Body Metrics Section -->
                    <div class="metrics-section">
                        <h2>Body Metrics</h2>
                        <div class="metrics-subtitle">Please input weight and height to calculate BMI</div>
                        <div class="metrics-grid">
                            <div class="metric-item">
                                <label for="weight-input">Weight</label>
                                <div class="metric-input-group">
                                    <input 
                                        type="number" 
                                        id="weight-input" 
                                        class="metric-input" 
                                        placeholder="Enter weight"
                                        step="0.1"
                                    >
                                    <span class="metric-unit">kg</span>
                                </div>
                            </div>
                            <div class="metric-item">
                                <label for="height-input">Height</label>
                                <div class="metric-input-group">
                                    <input 
                                        type="number" 
                                        id="height-input" 
                                        class="metric-input" 
                                        placeholder="Enter height"
                                        step="0.1"
                                    >
                                    <span class="metric-unit">cm</span>
                                </div>
                            </div>
                        </div>
                        <button id="calculate-bmi" class="calculate-btn" onclick="calculateBMI()">
                            Calculate BMI
                        </button>
                        <div id="bmi-result" class="bmi-result hidden">
                            <div class="bmi-value">Your BMI: <span id="bmi-number"></span></div>
                            <div class="bmi-category" id="bmi-category"></div>
                        </div>
                    </div>

                    <!-- Fitness Goals Section -->
                    <div class="goals-section">
                        <h2>Fitness Goals</h2>
                        <div class="goals-message">
                            No goals set. Click Edit Profile to add your fitness goals.
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="editProfile()">Edit Profile</button>
            </div>

            <!-- Exercises Page -->
            <div id="exercises-page" class="page">
                <div class="page-header">
                    <h1 class="page-title">Exercises</h1>
                </div>
                
                <div id="exercises-content">
                    <div class="exercises-controls">
                        <div class="search-wrapper">
                            <i class="fas fa-search search-icon"></i>
                            <input type="text" 
                                   id="exercise-search" 
                                   placeholder="Search exercises..."
                                   class="w-full">
                        </div>
                        
                        <div class="filters-wrapper">
                            <select id="muscle-filter" class="w-full">
                                <option value="any">Any Body Part</option>
                                <option value="abs">Abs</option>
                                <option value="back">Back</option>
                                <option value="biceps">Biceps</option>
                                <option value="chest">Chest</option>
                                <option value="forearms">Forearms</option>
                                <option value="legs">Legs</option>
                                <option value="shoulders">Shoulders</option>
                                <option value="triceps">Triceps</option>
                            </select>
                            
                            <select id="category-filter" class="w-full">
                                <option value="any">Any Category</option>
                                <option value="barbell">Barbell</option>
                                <option value="dumbbell">Dumbbell</option>
                                <option value="machine">Machine/Other</option>
                                <option value="bodyweight">Bodyweight</option>
                                <option value="cardio">Cardio</option>
                            </select>

                            <button id="saved-exercises-toggle" class="btn btn-outline" onclick="toggleSavedExercises()">
                                <i class="fas fa-bookmark"></i>
                                Saved Exercises
                            </button>
                        </div>
                    </div>

                    <div id="exercises-list" class="space-y-2">
                        <!-- Exercise items will be dynamically populated here -->
                    </div>
                </div>
            </div>

            <!-- Saved Exercises Page -->
            <div id="saved-exercises-page" class="page">
                <div class="page-header">
                    <h1 class="page-title">Saved Exercises</h1>
                </div>
                <div id="saved-exercises-content">
                    <div class="text-center p-8">
                        <div class="mb-4">
                            <i class="fas fa-bookmark text-gray-400" style="font-size: 4rem;"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">No Exercises Saved</h3>
                        <p class="text-gray-600 mb-4">Your bookmarked exercises will appear here.</p>
                        <button onclick="navigateTo('exercises')" class="btn btn-primary">
                            Browse Exercises
                        </button>
                    </div>
                </div>
            </div>

            <!-- Exercise Details Modal -->
            <div id="exercise-modal" class="modal">
                <div class="modal-content">
                    <div class="p-6">
                        <button class="close-button" onclick="closeExerciseModal()">×</button>
                        <div id="exercise-modal-content"></div>
                    </div>
                </div>
            </div>

            <!-- Workout Modal -->
            <div id="workout-modal" class="modal">
                <div class="modal-content workout-modal">
                    <div class="workout-modal-header">
                        <div class="workout-date"></div>
                        <div class="workout-timer">
                            <span id="timer-display">00:00:00</span>
                            <button id="timer-toggle" class="btn-primary">
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                        <button class="close-btn" onclick="closeWorkoutModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="workout-content">
                        <div id="exercise-selection" style="display: none;">
                            <div class="search-wrapper">
                                <i class="fas fa-search search-icon"></i>
                                <input type="text" id="workout-exercise-search" placeholder="Search exercises...">
                            </div>
                            <div class="filters-wrapper">
                                <select id="workout-muscle-filter">
                                    <option value="any">Any Muscle Group</option>
                                    <option value="chest">Chest</option>
                                    <option value="back">Back</option>
                                    <option value="shoulders">Shoulders</option>
                                    <option value="legs">Legs</option>
                                    <option value="arms">Arms</option>
                                    <option value="core">Core</option>
                                </select>
                                <select id="workout-category-filter">
                                    <option value="any">Any Category</option>
                                    <option value="barbell">Barbell</option>
                                    <option value="dumbbell">Dumbbell</option>
                                    <option value="machine">Machine</option>
                                    <option value="bodyweight">Bodyweight</option>
                                    <option value="cardio">Cardio</option>
                                </select>
                            </div>
                            <div id="workout-exercise-list" class="exercise-list">
                                <!-- Exercises will be listed here -->
                            </div>
                        </div>

                        <div id="current-workout">
                            <div id="selected-exercises">
                                <!-- Selected exercises will appear here -->
                            </div>
                            <div class="workout-actions">
                                <button onclick="showExerciseSelection()" class="btn-primary">
                                    <i class="fas fa-plus"></i> Add Exercise
                                </button>
                                <button onclick="cancelWorkout()" class="btn-secondary">
                                    Cancel Workout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Login Modal -->
    <div id="auth-modal" class="modal">
        <div class="modal-content auth-container">
            <button class="close-button" onclick="closeAuthModal()">&times;</button>
            <div class="auth-header">
                <h2 id="auth-subtitle" class="auth-subtitle">Sign in to your account</h2>
                </div>
            <div class="auth-tabs">
                <button id="login-tab" class="tab-button active" onclick="showTab('login')">Sign In</button>
                <button id="register-tab" class="tab-button" onclick="showTab('register')">Sign Up</button>
                    </div>
            <div id="login-tab-content" class="tab-content active">
                <form id="login-form" onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label for="login-username">Username</label>
                        <input type="text" id="login-username" required>
                </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" required>
                    </div>
                    <button type="submit" class="primary-button">Sign In</button>
                </form>
                    </div>
            <div id="register-tab-content" class="tab-content">
                <form id="register-form" onsubmit="handleRegister(event)">
                    <div class="form-group">
                        <label for="register-username">Username</label>
                        <input type="text" id="register-username" required>
                </div>
                    <div class="form-group">
                        <label for="register-email">Email</label>
                        <input type="email" id="register-email" required>
                    </div>
                    <div class="form-group">
                        <label for="register-password">Password</label>
                        <input type="password" id="register-password" required>
                    </div>
                    <button type="submit" class="primary-button">Create Account</button>
                </form>
                    </div>
            <div class="auth-footer">
                <p id="auth-footer-text" class="auth-footer-text">
                    No account yet? <span class="auth-footer-link" onclick="showTab('register')">Sign up</span>
                </p>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <div id="toast" class="hidden">
        <div id="toast-icon" class="success">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
        </div>
        <div id="toast-content">
            <h3 id="toast-title">Success</h3>
            <p id="toast-message">Action completed successfully</p>
        </div>
        <button id="close-toast">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
    </div>

    <!-- Workout Template Modal -->
    <div id="template-workout-modal" class="modal">
        <div class="modal-content workout-modal">
            <div class="workout-modal-header">
                <div>
                    <h2 id="template-workout-title" class="workout-title"></h2>
                    <div id="template-workout-date" class="workout-date"></div>
                </div>
                <div class="workout-timer">
                    <span id="template-timer-display">00:00:00</span>
                    <button id="template-timer-toggle" class="btn-primary">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
                <button class="close-btn" onclick="closeTemplateWorkoutModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="workout-content">
                <div id="template-exercises-list" class="exercise-list">
                    <!-- Exercises will be populated here -->
                </div>
            </div>
        </div>
    </div>

    <!-- Add this modal structure at the bottom of the body tag -->
    <div id="add-template-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Create New Template</h2>
                <button class="close-btn" onclick="closeAddTemplateModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="template-form">
                    <input type="text" id="template-name" placeholder="Template Name" class="template-input">
                    <div class="exercise-selection">
                        <h3>Select Exercises</h3>
                        <div class="search-wrapper">
                            <i class="fas fa-search search-icon"></i>
                            <input type="text" 
                                   id="template-exercise-search" 
                                   placeholder="Search exercises..."
                                   class="search-input">
                        </div>
                        <div id="template-exercise-list" class="exercise-list">
                            <!-- Exercises will be populated here -->
                        </div>
                    </div>
                    <div class="selected-exercises">
                        <h3>Selected Exercises</h3>
                        <div id="selected-template-exercises" class="selected-list">
                            <!-- Selected exercises will appear here -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="saveTemplate()">Save Template</button>
            </div>
        </div>
    </div>

    <script>
        // DOM Elements
        const logo = document.getElementById('logo');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('overlay');
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = {
            'start-workout': document.getElementById('start-workout-page'),
            'history': document.getElementById('history-page'),
            'profile': document.getElementById('profile-page'),
            'exercises': document.getElementById('exercises-page'),
            'saved-exercises': document.getElementById('saved-exercises-page')
        };

        // Current user state
        let currentUser = null;

        // Exercises data
        const exercises = [
            // Biceps
            {
                name: "Hammer Curl",
                target: "biceps",
                category: "dumbbell",
                description: "A bicep curl variation that targets both the biceps and forearms, performed with a neutral grip (palms facing each other).",
                videoUrl: "https://www.strengthlog.com/hammer-curl/"
            },
            {
                name: "Cable Curl with Rope",
                target: "biceps",
                category: "machine",
                description: "An isolation exercise for biceps using a rope attachment on a cable machine, providing constant tension throughout the movement.",
                videoUrl: "https://www.strengthlog.com/cable-curl-with-rope/"
            },
            {
                name: "Incline Dumbbell Curl",
                target: "biceps",
                category: "dumbbell",
                description: "A bicep exercise performed on an incline bench, emphasizing the stretch position of the biceps for enhanced muscle development.",
                videoUrl: "https://www.strengthlog.com/incline-dumbbell-curl/"
            },
            {
                name: "Dumbbell Preacher Curl",
                target: "biceps",
                category: "dumbbell",
                description: "An isolation exercise performed on a preacher bench, which helps eliminate momentum and focuses on strict bicep contraction.",
                videoUrl: "https://www.strengthlog.com/dumbbell-preacher-curl/"
            },
            
            // Triceps
            {
                name: "Tricep Pushdown with Bar",
                target: "triceps",
                category: "machine",
                description: "A fundamental triceps isolation exercise performed on a cable machine with a straight bar attachment, targeting all three heads of the triceps.",
                videoUrl: "https://www.strengthlog.com/tricep-pushdown-with-bar/"
            },
            {
                name: "Overhead Cable Triceps Extension",
                target: "triceps",
                category: "machine",
                description: "An isolation exercise that emphasizes the long head of the triceps by positioning the arms overhead, using a rope attachment on a cable machine.",
                videoUrl: "https://www.strengthlog.com/overhead-cable-triceps-extension/"
            },
            {
                name: "Barbell Standing Triceps Extension",
                target: "triceps",
                category: "barbell",
                description: "A compound triceps exercise performed standing with a barbell, targeting all three heads of the triceps while maintaining core stability.",
                videoUrl: "https://www.strengthlog.com/barbell-standing-triceps-extension/"
            },
            
            // Forearms
            {
                name: "Barbell Wrist Extension",
                target: "forearms",
                category: "barbell",
                description: "An isolation exercise targeting the extensor muscles of the forearms, performed by curling the wrists upward while holding a barbell.",
                videoUrl: "https://www.strengthlog.com/barbell-wrist-extension/"
            },
            {
                name: "Barbell Wrist Curl Behind the Back",
                target: "forearms",
                category: "barbell",
                description: "A variation of the wrist curl performed behind the back, emphasizing the flexor muscles of the forearms with increased range of motion.",
                videoUrl: "https://www.strengthlog.com/barbell-wrist-curl-behind-the-back/"
            },
            {
                name: "Barbell Wrist Curl",
                target: "forearms",
                category: "barbell",
                description: "A basic forearm exercise targeting the flexor muscles, performed by curling the wrists upward while resting the forearms on a bench.",
                videoUrl: "https://www.strengthlog.com/barbell-wrist-curl/"
            },
            {
                name: "Bar Hang",
                target: "forearms",
                category: "bodyweight",
                description: "A simple yet effective exercise for grip strength and forearm endurance, performed by hanging from a pull-up bar for time.",
                videoUrl: "https://www.strengthlog.com/bar-hang/"
            },
            
            // Shoulders
            {
                name: "Barbell Front Raise",
                target: "shoulders",
                category: "barbell",
                description: "An isolation exercise targeting the anterior deltoids, performed by raising a barbell from the thighs to shoulder height while keeping arms straight.",
                videoUrl: "https://www.strengthlog.com/barbell-front-raise/"
            },
            {
                name: "Cable Lateral Raise",
                target: "shoulders",
                category: "machine",
                description: "A lateral deltoid isolation exercise using cables for constant tension throughout the movement, providing better control and muscle engagement.",
                videoUrl: "https://www.strengthlog.com/cable-lateral-raise/"
            },
            {
                name: "Reverse Cable Fly",
                target: "shoulders",
                category: "machine",
                description: "An exercise targeting the posterior deltoids using cables, performed by pulling the arms back in a reverse fly motion for rear shoulder development.",
                videoUrl: "https://www.strengthlog.com/reverse-cable-fly/"
            },
            {
                name: "Dumbbell Lateral Raise",
                target: "shoulders",
                category: "dumbbell",
                description: "A classic shoulder isolation exercise targeting the lateral deltoids, performed by raising dumbbells out to the sides with slightly bent arms.",
                videoUrl: "https://www.strengthlog.com/dumbbell-lateral-raise/"
            },
            
            // Chest
            {
                name: "Machine Chest Fly",
                target: "chest",
                category: "machine",
                description: "An isolation exercise targeting the pectoralis muscles using a chest fly machine, focusing on horizontal adduction of the arms for optimal chest contraction.",
                videoUrl: "https://www.strengthlog.com/machine-chest-fly/"
            },
            {
                name: "Machine Chest Press",
                target: "chest",
                category: "machine",
                description: "A compound pressing movement on a machine that targets the chest muscles while providing stability and controlled range of motion.",
                videoUrl: "https://www.strengthlog.com/machine-chest-press/"
            },
            {
                name: "Incline Bench Press",
                target: "chest",
                category: "barbell",
                description: "A compound exercise performed on an inclined bench that emphasizes the upper portion of the chest muscles while also engaging shoulders and triceps.",
                videoUrl: "https://www.strengthlog.com/incline-bench-press/"
            },
            {
                name: "Bench Press",
                target: "chest",
                category: "barbell",
                description: "The fundamental compound exercise for chest development, targeting the entire pectoralis major while engaging shoulders and triceps as secondary muscles.",
                videoUrl: "https://www.strengthlog.com/bench-press/"
            },
            
            // Back
            {
                name: "Back Extension",
                target: "back",
                category: "bodyweight",
                description: "A lower back strengthening exercise performed on a hyperextension bench, targeting the spinal erectors and helping improve posture.",
                videoUrl: "https://www.strengthlog.com/back-extension/"
            },
            {
                name: "Cable Wide Grip Seated Row",
                target: "back",
                category: "machine",
                description: "A compound rowing movement using a cable machine with a wide grip attachment, targeting the upper back muscles with emphasis on the latissimus dorsi and rhomboids.",
                videoUrl: "https://www.strengthlog.com/cable-wide-grip-seated-row/"
            },
            {
                name: "Lat Pulldown with Pronated Grip",
                target: "back",
                category: "machine",
                description: "A vertical pulling exercise using an overhand grip to target the latissimus dorsi muscles, helping develop back width and upper body strength.",
                videoUrl: "https://www.strengthlog.com/lat-pulldown-with-pronated-grip/"
            },
            {
                name: "T-Bar Row",
                target: "back",
                category: "barbell",
                description: "A compound rowing exercise using a landmine or t-bar setup, effectively targeting the middle back muscles while allowing for heavy loads.",
                videoUrl: "https://www.strengthlog.com/t-bar-row/"
            },
            {
                name: "Barbell Shrug",
                target: "back",
                category: "barbell",
                description: "An isolation exercise targeting the upper trapezius muscles, performed by elevating the shoulders while holding a barbell.",
                videoUrl: "https://www.strengthlog.com/barbell-shrug/"
            },
            
            // Abs
            {
                name: "Hanging Knee Raise",
                target: "abs",
                category: "bodyweight",
                description: "A challenging core exercise performed hanging from a pull-up bar, raising the knees toward the chest to target the lower abs and hip flexors.",
                videoUrl: "https://www.strengthlog.com/hanging-knee-raise/"
            },
            {
                name: "Hanging Leg Raise",
                target: "abs",
                category: "bodyweight",
                description: "An advanced ab exercise performed while hanging from a pull-up bar, lifting straight legs to parallel to target the entire core with emphasis on lower abs.",
                videoUrl: "https://www.strengthlog.com/hanging-leg-raise/"
            },
            {
                name: "Crunch",
                target: "abs",
                category: "bodyweight",
                description: "A fundamental ab exercise performed lying on your back, lifting your shoulders off the ground to target the rectus abdominis muscles.",
                videoUrl: "https://www.strengthlog.com/crunch/"
            },
            {
                name: "Plank",
                target: "abs",
                category: "bodyweight",
                description: "An isometric core exercise that strengthens the entire midsection while improving stability and posture, held in a push-up position on forearms.",
                videoUrl: "https://www.strengthlog.com/plank/"
            },
            
            // Legs
            {
                name: "Standing Calf Raise",
                target: "legs",
                category: "machine",
                description: "An isolation exercise targeting the gastrocnemius and soleus muscles, performed by raising your heels off the ground while standing.",
                videoUrl: "https://www.strengthlog.com/standing-calf-raise/"
            },
            {
                name: "Hip Adduction Machine",
                target: "legs",
                category: "machine",
                description: "An isolation exercise targeting the inner thigh muscles (adductors), performed by squeezing your legs together against resistance.",
                videoUrl: "https://www.strengthlog.com/hip-adduction-machine/"
            },
            {
                name: "Hip Abduction Machine",
                target: "legs",
                category: "machine",
                description: "An isolation exercise targeting the outer thigh muscles (abductors), performed by pushing your legs apart against resistance.",
                videoUrl: "https://www.strengthlog.com/hip-abduction-machine/"
            },
            {
                name: "Leg Press",
                target: "legs",
                category: "machine",
                description: "A compound lower body exercise targeting quadriceps, hamstrings, and glutes, performed by pushing a weighted platform away from your body.",
                videoUrl: "https://www.strengthlog.com/leg-press/"
            },
            {
                name: "Seated Leg Curl",
                target: "legs",
                category: "machine",
                description: "An isolation exercise targeting the hamstrings, performed in a seated position by curling your legs against resistance.",
                videoUrl: "https://www.strengthlog.com/seated-leg-curl/"
            },
            {
                name: "Lying Leg Curl",
                target: "legs",
                category: "machine",
                description: "An isolation exercise targeting the hamstrings, performed lying face down by curling your legs against resistance.",
                videoUrl: "https://www.strengthlog.com/lying-leg-curl/"
            }
        ].sort((a, b) => a.name.localeCompare(b.name));

        // Event Listeners
        logo.addEventListener('click', () => navigateTo('start-workout'));
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);

        // Set up navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('href').substring(1);
                navigateTo(page);
                closeMobileMenu();
            });
        });

        // Navigation function
        function navigateTo(pageId) {
            // Hide all pages
            Object.values(pages).forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            const selectedPage = pages[pageId];
            if (selectedPage) {
                selectedPage.classList.add('active');
            
                // Update active nav link in both desktop and mobile menus
                document.querySelectorAll('.nav-link').forEach(link => {
                const linkPage = link.getAttribute('href').substring(1);
                if (linkPage === pageId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

                // Update URL hash without triggering scroll
                history.pushState(null, '', `#${pageId}`);

                // Load page content based on the selected page
                switch(pageId) {
                    case 'profile':
                        loadProfilePage();
                        break;
                    case 'history':
                        loadHistoryPage();
                        break;
                    case 'exercises':
                        loadExercisesPage();
                        break;
                    case 'start-workout':
                        // Reset workout view if needed
                        if (!document.getElementById('active-workout').classList.contains('hidden')) {
                            document.getElementById('workout-start').classList.remove('hidden');
                            document.getElementById('active-workout').classList.add('hidden');
                        }
                        break;
                    case 'saved-exercises':
                        loadSavedExercisesPage();
                        break;
                }
            }
        }

        // Handle URL hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && pages[hash]) {
                navigateTo(hash);
            }
        });

        // Toggle mobile menu
        function toggleMobileMenu() {
            mobileMenu.classList.toggle('open');
            overlay.classList.toggle('open');
        }

        // Close mobile menu
        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            overlay.classList.remove('open');
        }

        // User profile click handler
        document.getElementById('user-profile').addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (currentUser) {
                // Show profile popup for logged in users
            const existingPopup = document.querySelector('.profile-popup');
            if (existingPopup) {
                existingPopup.remove();
                return;
            }
            
                const popup = document.createElement('div');
                popup.className = 'profile-popup';
                popup.innerHTML = `
                    <button class="profile-popup-item" onclick="navigateTo('profile')">View Profile</button>
                    <button class="profile-popup-item text-red-500" onclick="logout()">Log Out</button>
                `;
                
                document.body.appendChild(popup);
                
                // Position popup
                const avatar = document.getElementById('user-avatar');
                const rect = avatar.getBoundingClientRect();
                popup.style.position = 'fixed';
                popup.style.top = `${rect.bottom + window.scrollY}px`;
                popup.style.right = `${window.innerWidth - rect.right}px`;
                
                // Close popup when clicking outside
                const closePopup = (e) => {
                    if (!popup.contains(e.target)) {
                        popup.remove();
                        document.removeEventListener('click', closePopup);
                    }
                };
                
                setTimeout(() => {
                    document.addEventListener('click', closePopup);
                }, 0);
            } else {
                // Show login modal for logged out users
                showAuthModal();
            }
        });

        // Modal functions
        function openModal(modalId) {
            document.getElementById(`${modalId}-modal`).classList.remove('hidden');
        }

        function closeModal(modalId) {
            document.getElementById(`${modalId}-modal`).classList.add('hidden');
        }

        // Auth Modal Functions
        function showAuthModal() {
            const modal = document.getElementById('auth-modal');
            modal.classList.add('show');
        }

        function closeAuthModal() {
            const modal = document.getElementById('auth-modal');
            modal.classList.remove('show');
        }

        function showTab(tab) {
            // Update tab buttons
            document.getElementById('login-tab').classList.toggle('active', tab === 'login');
            document.getElementById('register-tab').classList.toggle('active', tab === 'register');
            
            // Update tab content
            document.getElementById('login-tab-content').classList.toggle('active', tab === 'login');
            document.getElementById('register-tab-content').classList.toggle('active', tab === 'register');
            
            // Update subtitle and footer text
            const subtitle = document.getElementById('auth-subtitle');
            const footerText = document.getElementById('auth-footer-text');
            
            if (tab === 'login') {
                subtitle.textContent = 'Sign in to your account';
                footerText.innerHTML = 'No account yet? <span class="auth-footer-link" onclick="showTab(\'register\')">Sign up</span>';
            } else {
                subtitle.textContent = 'Create your account';
                footerText.innerHTML = 'Already have an account? <span class="auth-footer-link" onclick="showTab(\'login\')">Sign in</span>';
            }
        }

        // Login/Register Handlers
        async function handleLogin(event) {
            event.preventDefault();
            
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            if (!username || !password) {
                showToast('Error', 'Please fill in all fields', 'error');
                return;
            }
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                currentUser = {
                    username: user.username,
                    email: user.email
                };
                
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                updateUserUI();
                closeAuthModal();
                showToast('Success', 'Logged in successfully');
            } else {
                showToast('Error', 'Invalid username or password', 'error');
            }
        }

        async function handleRegister(event) {
            event.preventDefault();
            
            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            
            if (!username || !email || !password) {
                showToast('Error', 'Please fill in all fields', 'error');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if username already exists
            if (users.some(u => u.username === username)) {
                showToast('Error', 'Username already taken', 'error');
                return;
            }
            
            // Add new user
            const newUser = { username, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Log in the new user
            currentUser = {
                username: newUser.username,
                email: newUser.email
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUserUI();
            closeAuthModal();
            showToast('Success', 'Account created successfully');
        }

        function logout() {
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateUserUI();
            navigateTo('start-workout');
            showToast('Success', 'Logged out successfully');
        }

        function updateUserUI() {
            const avatar = document.getElementById('user-avatar');
            const loginStatus = document.getElementById('login-status');
            const profileUsername = document.getElementById('profile-username');
            
            if (currentUser) {
                avatar.textContent = currentUser.username.charAt(0).toUpperCase();
                loginStatus.textContent = currentUser.username;
                if (profileUsername) {
                    profileUsername.textContent = currentUser.username;
                }
            } else {
                avatar.textContent = '?';
                loginStatus.textContent = 'Logged out';
                if (profileUsername) {
                    profileUsername.textContent = 'Guest';
                }
            }
        }

        // Toast notification
        function showToast(title, message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastTitle = document.getElementById('toast-title');
            const toastMessage = document.getElementById('toast-message');
            const toastIcon = document.getElementById('toast-icon');
            
            toastTitle.textContent = title;
            toastMessage.textContent = message;
            
            if (type === 'error') {
                toastIcon.className = 'error';
                toastIcon.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                `;
            } else {
                toastIcon.className = 'success';
                toastIcon.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                `;
            }
            
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }

        document.getElementById('close-toast').addEventListener('click', () => {
            document.getElementById('toast').classList.add('hidden');
        });

        // Initialize the app
        function init() {
            // Check for logged in user
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                currentUser = JSON.parse(storedUser);
                updateUserUI();
            }
            
            // Set active page based on URL hash or default to start-workout
            const hash = window.location.hash.substring(1);
            if (hash && pages[hash]) {
                navigateTo(hash);
            } else {
                navigateTo('start-workout');
            }

            // Add click handlers to all navigation links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pageId = link.getAttribute('href').substring(1);
                    navigateTo(pageId);
                    closeMobileMenu();
                });
            });
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);

        // Load profile page
        function loadProfilePage() {
            const profileAvatar = document.getElementById('profile-avatar');
            const profileUsername = document.getElementById('profile-username');
            const profileEmail = document.getElementById('profile-email');
            const profileActions = document.getElementById('profile-actions');
            const fitnessGoals = document.getElementById('fitness-goals');

            if (currentUser) {
                // Update profile information for logged-in user
                profileAvatar.textContent = currentUser.username.charAt(0).toUpperCase();
                profileUsername.textContent = currentUser.username;
                profileEmail.textContent = currentUser.email;
                
                // Load saved goals
                if (fitnessGoals) {
                    fitnessGoals.value = currentUser.goals || '';
                    fitnessGoals.disabled = false;
                }
            } else {
                // Show login prompt for guests
                profileAvatar.textContent = '?';
                profileUsername.textContent = 'Guest';
                profileEmail.textContent = 'Please log in';
                
                if (fitnessGoals) {
                    fitnessGoals.value = '';
                    fitnessGoals.disabled = true;
                }
            }
        }

        function getBMICategoryClass(bmi) {
            if (bmi < 18.5) return 'underweight';
            if (bmi < 25) return 'normal';
            if (bmi < 30) return 'overweight';
            return 'obese';
        }

        // Add this function to check login status and show auth modal if needed
        function requireLogin() {
            if (!currentUser) {
                showAuthModal();
                return false;
            }
            return true;
        }

        // Modify these existing functions to include the login check:

        // For BMI calculation
        function calculateBMI() {
            if (!requireLogin()) return;
            
            const weightInput = document.getElementById('weight-input');
            const heightInput = document.getElementById('height-input');
            const bmiResult = document.getElementById('bmi-result');
            const bmiNumber = document.getElementById('bmi-number');
            const bmiCategory = document.getElementById('bmi-category');
            const metricsMessage = document.getElementById('metrics-message');

            // Get values
            const weight = parseFloat(weightInput.value);
            const height = parseFloat(heightInput.value) / 100; // Convert cm to meters

            // Validate inputs
            if (!weight || !height || weight <= 0 || height <= 0) {
                metricsMessage.textContent = 'Please enter valid weight and height values';
                metricsMessage.style.color = '#ef4444';
                bmiResult.classList.add('hidden');
                return;
            }

            // Calculate BMI
            const bmi = weight / (height * height);
            const bmiRounded = Math.round(bmi * 10) / 10;

            // Determine BMI category
            let category = '';
            let categoryClass = '';
            
            if (bmi < 18.5) {
                category = 'Underweight';
                categoryClass = 'underweight';
            } else if (bmi < 25) {
                category = 'Normal weight';
                categoryClass = 'normal';
            } else if (bmi < 30) {
                category = 'Overweight';
                categoryClass = 'overweight';
            } else {
                category = 'Obese';
                categoryClass = 'obese';
            }

            // Update UI
            bmiNumber.textContent = bmiRounded;
            bmiCategory.textContent = category;
            bmiCategory.className = `bmi-category ${categoryClass}`;
            bmiResult.classList.remove('hidden');
            metricsMessage.textContent = 'Please input weight and height to calculate BMI';
            metricsMessage.style.color = '#64748b';

            // Save to user data if logged in
            if (currentUser) {
                currentUser.bmi = {
                    weight: weight,
                    height: height * 100,
                    value: bmiRounded,
                    category: category
                };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
        }

        function saveGoals() {
            if (!requireLogin()) return;
            
            if (!currentUser) {
                showToast('Error', 'Please log in to save your goals', 'error');
                return;
            }

            const goals = document.getElementById('fitness-goals').value;
            currentUser.goals = goals;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showToast('Success', 'Goals saved successfully');
        }

        function editProfile() {
            const popup = document.createElement('div');
            popup.className = 'modal';
            popup.innerHTML = `
                <div class="modal-content">
                    <div class="auth-container">
                        <button class="close-button" onclick="closeEditProfile()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        
                        <div class="auth-header">
                            <h2 class="auth-title">Edit Profile</h2>
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="edit-username">Username</label>
                            <input type="text" id="edit-username" class="form-input" value="${currentUser.username}">
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="edit-email">Email</label>
                            <input type="email" id="edit-email" class="form-input" value="${currentUser.email}">
                        </div>

                        <button class="auth-button" onclick="saveProfile()">Save Changes</button>
                    </div>
                </div>
            `;
            document.body.appendChild(popup);
        }

        function closeEditProfile() {
            const popup = document.querySelector('.modal');
            popup.remove();
        }

        function saveProfile() {
            const username = document.getElementById('edit-username').value;
            const email = document.getElementById('edit-email').value;

            if (!username || !email) {
                showToast('Error', 'Please fill in all fields', 'error');
                return;
            }

            // Update user data
            currentUser.username = username;
            currentUser.email = email;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // Update UI
            closeEditProfile();
            loadProfilePage();
            updateUserUI();
            showToast('Success', 'Profile updated successfully');
        }

        // Load history page
        function loadHistoryPage() {
            // This would be populated with actual workout history
            const container = document.getElementById('workout-history-container');
            const noWorkoutsMessage = document.getElementById('no-workouts-message');
            
            if (!currentUser) {
                container.innerHTML = '';
                noWorkoutsMessage.innerHTML = `
                    <p class="text-muted">Please log in to view workout history</p>
                    <button class="btn btn-primary mt-4" onclick="showAuthModal()">Log In</button>
                `;
                return;
            }

            // Example history entries
            const workouts = [
                {
                    date: 'Today, 2:30 PM',
                    exercises: ['Bench Press', 'Incline Dumbbell Press', 'Cable Fly'],
                    duration: '45 minutes'
                },
                {
                    date: 'Yesterday',
                    exercises: ['Squat', 'Leg Press', 'Leg Curl'],
                    duration: '55 minutes'
                }
            ];

            if (workouts.length === 0) {
                container.innerHTML = '';
                noWorkoutsMessage.classList.remove('hidden');
            } else {
                noWorkoutsMessage.classList.add('hidden');
                container.innerHTML = workouts.map(workout => `
                    <div class="card mb-4">
                        <div class="card-header">
                            <h3 class="font-semibold">${workout.date}</h3>
                            <span class="text-muted">${workout.duration}</span>
                    </div>
                        <div class="card-content">
                            <ul class="list-disc pl-5">
                                ${workout.exercises.map(ex => `<li>${ex}</li>`).join('')}
                            </ul>
                </div>
                </div>
                `).join('');
            }
        }

        // Load exercises page
        function loadExercisesPage() {
            const exercisesList = document.getElementById('exercises-list');
            
            // Clear existing content
            exercisesList.innerHTML = '';
            
            // Render all exercises
            renderExercisesList(exercises);
            
            // Set up search and filter functionality
            const searchInput = document.getElementById('exercise-search');
            const muscleFilter = document.getElementById('muscle-filter');
            const categoryFilter = document.getElementById('category-filter');
            
            searchInput.addEventListener('input', filterExercises);
            muscleFilter.addEventListener('change', filterExercises);
            categoryFilter.addEventListener('change', filterExercises);
        }

        function renderExercisesList(exercisesToRender, container = 'exercises-list') {
            const listContainer = document.getElementById(container);
            
            if (exercisesToRender.length === 0) {
                listContainer.innerHTML = `
                    <div class="text-center p-8">
                        <div class="mb-4">
                            <i class="fas fa-search text-gray-400" style="font-size: 3rem;"></i>
                        </div>
                        <h3 class="text-lg font-semibold mb-2">No Exercises Found</h3>
                        <p class="text-gray-600">Try adjusting your filters or search term</p>
                </div>
            `;
                return;
            }
            
            listContainer.innerHTML = exercisesToRender.map(exercise => `
                    <div class="exercise-item">
                        <div class="exercise-content" onclick="showExerciseDetails('${exercise.name}', '${exercise.target}', '${exercise.category}', '${exercise.description}', '${exercise.videoUrl}')">
                            <h3 class="font-semibold">${exercise.name}</h3>
                            <p class="text-sm text-muted">Target: ${exercise.target} | Category: ${exercise.category}</p>
                        </div>
                        <button class="bookmark-btn" onclick="toggleBookmark('${exercise.name}')" data-exercise="${exercise.name}" title="${isExerciseBookmarked(exercise.name) ? 'Remove from bookmarks' : 'Add to bookmarks'}">
                            <i class="fas fa-bookmark ${isExerciseBookmarked(exercise.name) ? 'text-primary' : ''}"></i>
                        </button>
                    </div>
                `).join('');
            }

            function filterExercises() {
            const searchTerm = document.getElementById('exercise-search').value.toLowerCase();
            const selectedMuscle = document.getElementById('muscle-filter').value;
            const selectedCategory = document.getElementById('category-filter').value;
                const showingSaved = document.getElementById('saved-exercises-toggle').classList.contains('active');

                let filtered = exercises;

                // First apply bookmark filter if active
                if (showingSaved) {
                    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedExercises') || '[]');
                    if (bookmarks.length === 0) {
                        document.getElementById('exercises-list').innerHTML = `
                            <div class="no-bookmarks-message text-center p-8">
                                <div class="mb-4">
                                    <i class="fas fa-bookmark text-gray-400" style="font-size: 4rem;"></i>
                                </div>
                                <h3 class="text-xl font-semibold mb-2">No Exercises Bookmarked</h3>
                                <p class="text-gray-600 mb-4">Click the bookmark icon on any exercise to save it here for quick access.</p>
                                <button onclick="document.getElementById('saved-exercises-toggle').click()" class="btn btn-primary">
                                    View All Exercises
                                </button>
                            </div>
                        `;
                        return;
                    }
                    filtered = filtered.filter(exercise => bookmarks.includes(exercise.name));
                }

                // Then apply other filters
                filtered = filtered.filter(exercise => {
                    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm);
                    const matchesMuscle = selectedMuscle === 'any' || exercise.target === selectedMuscle;
                    const matchesCategory = selectedCategory === 'any' || exercise.category === selectedCategory;
                    return matchesSearch && matchesMuscle && matchesCategory;
                });

            renderExercisesList(filtered);
        }

        function isExerciseBookmarked(exerciseName) {
            if (!currentUser) return false;
            const bookmarks = JSON.parse(localStorage.getItem('bookmarkedExercises') || '[]');
            return bookmarks.includes(exerciseName);
        }

        function toggleBookmark(exerciseName) {
            if (!requireLogin()) return;
            
            if (!currentUser) {
                showToast('Error', 'Please log in to bookmark exercises', 'error');
                    return;
                }

            const bookmarks = JSON.parse(localStorage.getItem('bookmarkedExercises') || '[]');
            const index = bookmarks.indexOf(exerciseName);
            
            if (index === -1) {
                bookmarks.push(exerciseName);
                showToast('Success', 'Exercise bookmarked');
            } else {
                bookmarks.splice(index, 1);
                showToast('Success', 'Exercise removed from bookmarks');
            }
            
            localStorage.setItem('bookmarkedExercises', JSON.stringify(bookmarks));
            
            // Update bookmark icon
            const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
            bookmarkButtons.forEach(btn => {
                if (btn.getAttribute('data-exercise') === exerciseName) {
                    const icon = btn.querySelector('i');
                    icon.classList.toggle('text-primary');
                }
            });

            // Refresh the exercises list if we're currently filtering by saved exercises
            if (document.getElementById('saved-exercises-toggle').classList.contains('active')) {
                filterExercises();
            }
        }

        function showExerciseDetails(name, target, category, description, videoUrl) {
            const modal = document.getElementById('exercise-modal');
            const content = document.getElementById('exercise-modal-content');
            
            content.innerHTML = `
                <div class="exercise-modal-header">
                    <h2 class="text-xl font-semibold">${name}</h2>
                    <button class="close-modal" onclick="closeExerciseModal()">&times;</button>
                </div>

                <div class="exercise-tabs">
                    <button class="exercise-tab active" onclick="switchExerciseTab('tutorial')">Tutorial</button>
                    <button class="exercise-tab" onclick="switchExerciseTab('history')">History</button>
                    <button class="exercise-tab" onclick="switchExerciseTab('all-exercises')">All Exercises</button>
                </div>

                <div class="exercise-tab-content active" id="tutorial-tab">
                    <div class="exercise-description">
                        <p>${description}</p>
                    </div>

                    <div class="exercise-steps">
                        <ol>
                        <li class="exercise-step">
                            <div class="step-number">1</div>
                            <div>Starting Position: ${getStartingPosition(name)}</div>
                        </li>
                        <li class="exercise-step">
                            <div class="step-number">2</div>
                            <div>Movement: ${getMovementInstructions(name)}</div>
                        </li>
                        <li class="exercise-step">
                            <div class="step-number">3</div>
                            <div>Form Tips: ${getFormTips(name)}</div>
                        </li>
                    </ol>
                </div>

                    <div class="exercise-video">
                        <a href="${videoUrl}" target="_blank" class="btn-primary">Watch Video Tutorial</a>
                    </div>
                </div>

                <div class="exercise-tab-content" id="history-tab">
                    <div class="exercise-history">
                        ${getExerciseHistory(name)}
                    </div>
                </div>

                <div class="exercise-tab-content" id="all-exercises-tab">
                    <div class="exercise-list">
                        ${exercises.map(exercise => `
                            <div class="exercise-item" onclick="showExerciseDetails('${exercise.name}', '${exercise.target}', '${exercise.category}', '${exercise.description}', '${exercise.videoUrl}')">
                                <h3>${exercise.name}</h3>
                                <p>Target: ${exercise.target} | Category: ${exercise.category}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            modal.classList.add('show');
        }

        function switchExerciseTab(tab) {
            const tabs = document.querySelectorAll('.exercise-tab');
            const contents = document.querySelectorAll('.exercise-tab-content');
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            document.querySelector(`.exercise-tab[onclick*="${tab}"]`).classList.add('active');
            document.getElementById(`${tab}-tab`).classList.add('active');
        }

        function getStartingPosition(exerciseName) {
            // Return specific starting position for each exercise
            switch(exerciseName) {
                case "Barbell Front Raise":
                return "Stand with feet shoulder-width apart, holding a barbell with both hands in front of your thighs using an overhand grip. Keep your back straight and core engaged.";
                case "Hammer Curl":
                    return "Stand with feet shoulder-width apart, holding dumbbells at your sides with palms facing your torso (neutral grip). Keep elbows close to your torso.";
                case "Bench Press":
                    return "Lie on a flat bench with feet flat on the floor. Grip the barbell slightly wider than shoulder-width. Unrack the bar and hold it straight above your chest with arms extended.";
                default:
            return "Position yourself properly with good form and stable stance.";
            }
        }

        function getMovementInstructions(exerciseName) {
            // Return specific movement instructions for each exercise
            switch(exerciseName) {
                case "Barbell Front Raise":
                return "With control, lift the barbell forward and upward by raising your straight arms until the bar reaches shoulder height. Keep your core tight and avoid swinging or using momentum.";
                case "Hammer Curl":
                    return "Keeping your upper arms stationary, exhale and curl the weights while contracting your biceps. Continue to raise the dumbbells until your biceps are fully contracted and the dumbbells are at shoulder level.";
                case "Bench Press":
                    return "Lower the bar to your mid-chest, keeping elbows at about a 75-degree angle. Press the bar back up to the starting position by extending your arms, exhaling as you push.";
                default:
            return "Perform the movement with controlled form through the full range of motion.";
            }
        }

        function getFormTips(exerciseName) {
            // Return specific form tips for each exercise
            switch(exerciseName) {
                case "Barbell Front Raise":
                return "Lower the barbell back down to the starting position with the same controlled motion. Maintain straight arms throughout the movement, but avoid locking your elbows. Keep your shoulders down and back, and breathe steadily.";
                case "Hammer Curl":
                    return "Keep your elbows close to your torso at all times. Only the forearms should move. Avoid swinging or using momentum to lift the weights. Squeeze your biceps at the top of the movement.";
                case "Bench Press":
                    return "Keep your feet flat on the floor and maintain a slight arch in your back. Don't bounce the bar off your chest. Keep your wrists straight to avoid injury.";
                default:
            return "Maintain proper form throughout the movement, focus on muscle engagement.";
            }
        }

        function getExerciseHistory(exerciseName) {
            // This would be populated with actual user history
            if (!currentUser) {
                return `
                    <div class="p-4 text-center">
                        <p class="text-muted">Please log in to view exercise history</p>
                        <button class="btn btn-primary mt-4" onclick="showAuthModal()">Log In</button>
                    </div>
                `;
            }

            // Example history entries
            return `
                <div class="history-entry">
                    <div>
                        <div class="history-date">Today, 2:30 PM</div>
                        <div>3 sets × 12 reps</div>
                    </div>
                    <div class="history-details">
                        <div class="history-weight">50 kg</div>
                        <div class="text-muted">Personal Best</div>
                    </div>
                </div>
                <div class="history-entry">
                    <div>
                        <div class="history-date">Yesterday</div>
                        <div>3 sets × 10 reps</div>
                    </div>
                    <div class="history-details">
                        <div class="history-weight">45 kg</div>
                    </div>
                </div>
            `;
        }

        function closeExerciseModal() {
            const modal = document.getElementById('exercise-modal');
            modal.classList.remove('show');
        }

        // Load saved exercises page
        function loadSavedExercisesPage() {
            const savedExercisesContent = document.getElementById('saved-exercises-content');
            const bookmarks = JSON.parse(localStorage.getItem('bookmarkedExercises') || '[]');
            
            if (!currentUser) {
                savedExercisesContent.innerHTML = `
                    <div class="text-center p-8">
                        <p class="text-muted mb-4">Please log in to view your saved exercises</p>
                        <button class="btn btn-primary" onclick="showAuthModal()">Log In</button>
                    </div>
                `;
                return;
            }
            
            if (bookmarks.length === 0) {
                savedExercisesContent.innerHTML = `
                    <div class="text-center p-8">
                        <p class="text-muted mb-4">No saved exercises yet</p>
                        <button class="btn btn-primary" onclick="navigateTo('exercises')">Browse Exercises</button>
                    </div>
                `;
                return;
            }
            
            const savedExercises = exercises.filter(exercise => bookmarks.includes(exercise.name));
            
            savedExercisesContent.innerHTML = `
                <div class="exercises-controls">
                    <div class="search-wrapper">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" 
                               id="saved-exercise-search" 
                               placeholder="Search saved exercises..."
                               class="w-full">
                    </div>
                </div>
                <div id="saved-exercises-list" class="space-y-2">
                    <!-- Saved exercises will be populated here -->
                </div>
            `;
            
            renderExercisesList(savedExercises, 'saved-exercises-list');
            
            // Add search functionality for saved exercises
            const searchInput = document.getElementById('saved-exercise-search');
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filtered = savedExercises.filter(exercise => 
                    exercise.name.toLowerCase().includes(searchTerm)
                );
                renderExercisesList(filtered, 'saved-exercises-list');
            });
        }

        function toggleSavedExercises() {
            if (!requireLogin()) return;
            
            if (!currentUser) {
                showToast('Error', 'Please log in to view saved exercises', 'error');
                return;
            }
            navigateTo('saved-exercises');
        }

        // Workout functionality
        let workoutTimer = null;
        let workoutSeconds = 0;
        let selectedExercises = [];

        function startEmptyWorkout() {
            if (!requireLogin()) return;
            
            const modal = document.getElementById('workout-modal');
            const dateDisplay = modal.querySelector('.workout-date');
            const now = new Date();
            dateDisplay.textContent = now.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            modal.classList.add('show');
            document.getElementById('current-workout').style.display = 'block';
            document.getElementById('exercise-selection').style.display = 'none';
            selectedExercises = [];
            renderSelectedExercises();
            
            // Reset and start timer
            workoutSeconds = 0;
            updateTimerDisplay();
        }

        function updateTimerDisplay() {
            const hours = Math.floor(workoutSeconds / 3600);
            const minutes = Math.floor((workoutSeconds % 3600) / 60);
            const seconds = workoutSeconds % 60;
            
            document.getElementById('timer-display').textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        function toggleTimer() {
            const button = document.getElementById('timer-toggle');
            if (workoutTimer) {
                clearInterval(workoutTimer);
                workoutTimer = null;
                button.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                workoutTimer = setInterval(() => {
                    workoutSeconds++;
                    updateTimerDisplay();
                }, 1000);
                button.innerHTML = '<i class="fas fa-pause"></i>';
            }
        }

        function showExerciseSelection() {
            document.getElementById('current-workout').style.display = 'none';
            document.getElementById('exercise-selection').style.display = 'block';
            renderExerciseList();
        }

        function renderExerciseList() {
            const searchTerm = document.getElementById('workout-exercise-search').value.toLowerCase();
            const selectedMuscle = document.getElementById('workout-muscle-filter').value;
            const selectedCategory = document.getElementById('workout-category-filter').value;
            
            const filteredExercises = exercises.filter(exercise => {
                const matchesSearch = exercise.name.toLowerCase().includes(searchTerm);
                const matchesMuscle = selectedMuscle === 'any' || exercise.target === selectedMuscle;
                const matchesCategory = selectedCategory === 'any' || exercise.category === selectedCategory;
                return matchesSearch && matchesMuscle && matchesCategory;
            });
            
            const listContainer = document.getElementById('workout-exercise-list');
            listContainer.innerHTML = filteredExercises.map(exercise => `
                <div class="exercise-item" onclick="addExerciseToWorkout('${exercise.name}')">
                    <div class="exercise-info">
                        <h4>${exercise.name}</h4>
                        <p class="target-muscle">${exercise.target} | ${exercise.category}</p>
                    </div>
                    <button class="btn-primary add-exercise-btn">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            `).join('');
        }

        function addExerciseToWorkout(exerciseName) {
            const exercise = exercises.find(e => e.name === exerciseName);
            if (exercise) {
                selectedExercises.push({
                    ...exercise,
                    sets: [{
                        reps: '',
                        weight: '',
                        completed: false
                    }]
                });
                renderSelectedExercises();
                document.getElementById('current-workout').style.display = 'block';
                document.getElementById('exercise-selection').style.display = 'none';
            }
        }

        function renderSelectedExercises() {
            const container = document.getElementById('selected-exercises');
            container.innerHTML = selectedExercises.map((exercise, exerciseIndex) => `
                <div class="selected-exercise">
                    <div class="exercise-header">
                        <h4>${exercise.name}</h4>
                        <button onclick="removeExercise(${exerciseIndex})" class="btn-text">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="sets-container">
                        ${exercise.sets.map((set, setIndex) => `
                            <div class="set-row">
                                <span class="set-number">Set ${setIndex + 1}</span>
                                <input type="number" 
                                       placeholder="kg" 
                                       value="${set.weight}"
                                       onchange="updateSet(${exerciseIndex}, ${setIndex}, 'weight', this.value)"
                                       class="weight-input">
                                <input type="number" 
                                       placeholder="reps" 
                                       value="${set.reps}"
                                       onchange="updateSet(${exerciseIndex}, ${setIndex}, 'reps', this.value)"
                                       class="reps-input">
                                <button onclick="toggleSetCompletion(${exerciseIndex}, ${setIndex})"
                                        class="btn-text ${set.completed ? 'completed' : ''}">
                                    <i class="fas ${set.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                                </button>
                            </div>
                        `).join('')}
                        <button onclick="addSet(${exerciseIndex})" class="btn-text add-set-btn">
                            <i class="fas fa-plus"></i> Add Set
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function updateSet(exerciseIndex, setIndex, field, value) {
            selectedExercises[exerciseIndex].sets[setIndex][field] = value;
        }

        function toggleSetCompletion(exerciseIndex, setIndex) {
            selectedExercises[exerciseIndex].sets[setIndex].completed = 
                !selectedExercises[exerciseIndex].sets[setIndex].completed;
            renderSelectedExercises();
        }

        function addSet(exerciseIndex) {
            selectedExercises[exerciseIndex].sets.push({
                reps: '',
                weight: '',
                completed: false
            });
            renderSelectedExercises();
        }

        function removeExercise(index) {
            selectedExercises.splice(index, 1);
            renderSelectedExercises();
        }

        function closeWorkoutModal() {
            if (workoutTimer) {
                clearInterval(workoutTimer);
                workoutTimer = null;
            }
            document.getElementById('workout-modal').classList.remove('show');
        }

        function cancelWorkout() {
            if (confirm('Are you sure you want to cancel this workout? All progress will be lost.')) {
                closeWorkoutModal();
            }
        }

        // Add event listeners for workout functionality
        document.getElementById('workout-exercise-search').addEventListener('input', renderExerciseList);
        document.getElementById('workout-muscle-filter').addEventListener('change', renderExerciseList);
        document.getElementById('workout-category-filter').addEventListener('change', renderExerciseList);
        document.getElementById('timer-toggle').addEventListener('click', toggleTimer);

        function showQuickStartModal() {
            const modal = document.getElementById('quick-start-modal');
            const content = document.getElementById('quick-start-content');
            
            content.innerHTML = `
                <div class="quick-start-header">
                    <h2>Quick Start Workout</h2>
                    <button class="close-modal" onclick="closeQuickStartModal()">&times;</button>
                </div>

                <div class="quick-start-timer">
                    <div class="timer-display">00:00:00</div>
                    <div class="timer-controls">
                        <button onclick="startTimer()" class="timer-btn">Start</button>
                        <button onclick="pauseTimer()" class="timer-btn">Pause</button>
                        <button onclick="resetTimer()" class="timer-btn">Reset</button>
                    </div>
                </div>

                <div class="exercise-list" id="quick-start-exercises">
                    ${exercises.map(exercise => `
                        <div class="exercise-item" onclick="addExerciseToWorkout('${exercise.name}')">
                            <h3>${exercise.name}</h3>
                            <p>Target: ${exercise.target} | Category: ${exercise.category}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="workout-summary" id="workout-summary" style="display: none;">
                    <div class="summary-header">
                        <h3 class="summary-title">Workout Summary</h3>
                        <div class="timer-display">00:00:00</div>
                    </div>

                    <div class="summary-stats">
                        <div class="stat-card">
                            <div class="stat-value" id="total-exercises">0</div>
                            <div class="stat-label">Exercises</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" id="total-sets">0</div>
                            <div class="stat-label">Total Sets</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" id="total-weight">0 kg</div>
                            <div class="stat-label">Total Weight</div>
                        </div>
                    </div>

                    <div id="exercise-summary-list">
                        <!-- Exercise summaries will be added here -->
                    </div>

                    <button class="finish-workout-btn" onclick="saveWorkout()">Finish Workout</button>
                </div>
            `;
            
            modal.classList.add('show');
        }

        function addExerciseToWorkout(exerciseName) {
            const exercise = exercises.find(e => e.name === exerciseName);
            if (!exercise) return;

            const summaryList = document.getElementById('exercise-summary-list');
            const exerciseSummary = document.createElement('div');
            exerciseSummary.className = 'exercise-summary';
            exerciseSummary.innerHTML = `
                <div class="exercise-name">${exercise.name}</div>
                <div class="exercise-sets">
                    <div class="set-item">Set 1: <input type="number" placeholder="Weight" class="set-weight"> kg × <input type="number" placeholder="Reps" class="set-reps"></div>
                </div>
                <button onclick="addSet(this)" class="btn-secondary">Add Set</button>
            `;
            summaryList.appendChild(exerciseSummary);

            // Show workout summary if it was hidden
            document.getElementById('workout-summary').style.display = 'block';
            updateWorkoutStats();
        }

        function addSet(button) {
            const exerciseSummary = button.parentElement;
            const setsContainer = exerciseSummary.querySelector('.exercise-sets');
            const setCount = setsContainer.children.length + 1;
            
            const newSet = document.createElement('div');
            newSet.className = 'set-item';
            newSet.innerHTML = `Set ${setCount}: <input type="number" placeholder="Weight" class="set-weight"> kg × <input type="number" placeholder="Reps" class="set-reps">`;
            setsContainer.appendChild(newSet);
            
            updateWorkoutStats();
        }

        function updateWorkoutStats() {
            const exercises = document.querySelectorAll('.exercise-summary');
            const totalExercises = exercises.length;
            const totalSets = document.querySelectorAll('.set-item').length;
            
            let totalWeight = 0;
            document.querySelectorAll('.set-weight').forEach(input => {
                const weight = parseFloat(input.value) || 0;
                const reps = parseFloat(input.nextElementSibling.value) || 0;
                totalWeight += weight * reps;
            });

            document.getElementById('total-exercises').textContent = totalExercises;
            document.getElementById('total-sets').textContent = totalSets;
            document.getElementById('total-weight').textContent = `${totalWeight} kg`;
        }

        function saveWorkout() {
            const workoutData = {
                date: new Date().toISOString(),
                duration: document.querySelector('.timer-display').textContent,
                exercises: Array.from(document.querySelectorAll('.exercise-summary')).map(exercise => ({
                    name: exercise.querySelector('.exercise-name').textContent,
                    sets: Array.from(exercise.querySelectorAll('.set-item')).map(set => {
                        const weight = parseFloat(set.querySelector('.set-weight').value) || 0;
                        const reps = parseFloat(set.querySelector('.set-reps').value) || 0;
                        return { weight, reps };
                    })
                }))
            };

            // Save workout data to user's history
            if (currentUser) {
                if (!currentUser.workoutHistory) {
                    currentUser.workoutHistory = [];
                }
                currentUser.workoutHistory.push(workoutData);
                currentUser.workoutsCompleted = (currentUser.workoutsCompleted || 0) + 1;
                
                // Update total weight lifted
                const totalWeight = workoutData.exercises.reduce((total, exercise) => {
                    return total + exercise.sets.reduce((setTotal, set) => setTotal + (set.weight * set.reps), 0);
                }, 0);
                currentUser.totalWeightLifted = (currentUser.totalWeightLifted || 0) + totalWeight;
            }

            closeQuickStartModal();
            showNotification('Workout saved successfully!');
        }

        // Template workout functionality
        let templateWorkoutTimer = null;
        let templateWorkoutSeconds = 0;

        function startTemplateWorkout(templateType) {
            if (!requireLogin()) return;
            
            const modal = document.getElementById('template-workout-modal');
            const title = document.getElementById('template-workout-title');
            const dateDisplay = document.getElementById('template-workout-date');
            const exercisesList = document.getElementById('template-exercises-list');
            
            // Set the title (capitalize first letter)
            title.textContent = templateType.charAt(0).toUpperCase() + templateType.slice(1) + ' Day';
            
            // Set current date
            const now = new Date();
            dateDisplay.textContent = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Get exercises for the template
            const exercises = getTemplateExercises(templateType);
            
            // Populate exercises with simple list
            exercisesList.innerHTML = exercises.map(exercise => `
                <div class="exercise-item">
                    ${exercise}
                </div>
            `).join('');
            
            // Show modal
            modal.style.display = 'flex';
            
            // Reset and start timer
            resetTemplateWorkoutTimer();
            startTemplateWorkoutTimer();
        }

        function getTemplateExercises(templateType) {
            // Define exercises for each template
            const templates = {
                legs: ['Leg Press', 'Standing Calf Raise', 'Lying Leg Curl'],
                arms: ['Hammer Curl', 'Cable Curl with Rope', 'Tricep Pushdown'],
                chest: ['Bench Press', 'Incline DB Press', 'Cable Flyes'],
                back: ['Lat Pulldown', 'Barbell Row', 'Face Pull'],
                fullbody: ['Squat', 'Bench Press', 'Deadlift', 'Shoulder Press'],
                core: ['Planks', 'Russian Twists', 'Ab Rollouts']
            };
            
            return templates[templateType] || [];
        }

        function resetTemplateWorkoutTimer() {
            templateWorkoutSeconds = 0;
            updateTemplateTimerDisplay();
        }

        function updateTemplateTimerDisplay() {
            const hours = Math.floor(templateWorkoutSeconds / 3600);
            const minutes = Math.floor((templateWorkoutSeconds % 3600) / 60);
            const seconds = templateWorkoutSeconds % 60;
            
            const display = document.getElementById('template-timer-display');
            display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        function startTemplateWorkoutTimer() {
            if (!templateWorkoutTimer) {
                templateWorkoutTimer = setInterval(() => {
                    templateWorkoutSeconds++;
                    updateTemplateTimerDisplay();
                }, 1000);
                
                const button = document.getElementById('template-timer-toggle');
                button.innerHTML = '<i class="fas fa-pause"></i>';
            }
        }

        function toggleTemplateWorkoutTimer() {
            const button = document.getElementById('template-timer-toggle');
            
            if (templateWorkoutTimer) {
                clearInterval(templateWorkoutTimer);
                templateWorkoutTimer = null;
                button.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                startTemplateWorkoutTimer();
            }
        }

        function closeTemplateWorkoutModal() {
            const modal = document.getElementById('template-workout-modal');
            modal.style.display = 'none';
            
            // Stop and reset timer
            if (templateWorkoutTimer) {
                clearInterval(templateWorkoutTimer);
                templateWorkoutTimer = null;
            }
            resetTemplateWorkoutTimer();
        }

        // Add event listener for template timer toggle
        document.getElementById('template-timer-toggle').addEventListener('click', toggleTemplateWorkoutTimer);
    </script>
</body>
</html>
```