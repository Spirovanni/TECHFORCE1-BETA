import { Menu } from './menu.model';

export const verticalMenuItems = [
    new Menu (1, 'Dashboard', '/pages', null, 'dashboard', null, false, 0),
    new Menu (2, 'Admin', '/pages/admin', null, 'folder', null, false, 0),
    new Menu (3, 'Habits', null, null, 'check_box', null, true, 0),
    new Menu (4, 'Habit List', '/pages/admin', null, 'view_module', null, false, 3),
    new Menu (5, 'New Habit', '/pages/admin', null, 'view_module', null, false, 3),
    new Menu (6, 'Users', null, null, 'account_balance_wallet', null, true, 0),
    new Menu (7, 'User List', '/pages/admin', null, 'assignment_ind', null, false, 6),
    new Menu (8, 'New User', '/pages/admin', null, 'perm_identity', null, false, 6),
    new Menu (9, 'Messages', null, null, 'letter', null, true, 0),
    new Menu (10, 'Message List', '/pages/admin', null, 'view_module', null, false, 9),
    new Menu (11, 'New Message', '/pages/admin', null, 'view_module', null, false, 9),
    new Menu (12, 'Types', null, null, 'check_box', null, true, 0),
    new Menu (13, 'Type List', '/pages/admin', null, 'view_module', null, false, 9),
    new Menu (14, 'New Type', '/pages/admin', null, 'view_module', null, false, 9),
  
    new Menu (21, 'Users', '/pages/users', null, 'supervisor_account', null, false, 0),
    new Menu (22, 'UI Features', null, null, 'computer', null, true, 0),
    new Menu (23, 'Buttons', '/pages/ui/buttons', null, 'keyboard', null, false, 22),
    new Menu (24, 'Cards', '/pages/ui/cards', null, 'card_membership', null, false, 22),
    new Menu (25, 'Lists', '/pages/ui/lists', null, 'list', null, false, 22),
    new Menu (26, 'Grids', '/pages/ui/grids', null, 'grid_on', null, false, 22),
    new Menu (27, 'Tabs', '/pages/ui/tabs', null, 'tab', null, false, 22),
    new Menu (28, 'Expansion Panel', '/pages/ui/expansion-panel', null, 'dns', null, false, 22),
    new Menu (29, 'Chips', '/pages/ui/chips', null, 'label', null, false, 22),
    new Menu (30, 'Progress', '/pages/ui/progress', null, 'data_usage', null, false, 22),
    new Menu (31, 'Dialog', '/pages/ui/dialog', null, 'open_in_new', null, false, 22),
    new Menu (32, 'Tooltip', '/pages/ui/tooltip', null, 'chat_bubble', null, false, 22),
    new Menu (33, 'Snackbar', '/pages/ui/snack-bar', null, 'sms', null, false, 22),
    new Menu (34, 'Dynamic Menu', '/pages/dynamic-menu', null, 'format_list_bulleted', null, false, 0),
    new Menu (35, 'Mailbox', '/pages/mailbox', null, 'email', null, false, 0),
    new Menu (36, 'Chat', '/pages/chat', null, 'chat', null, false, 0),
    new Menu (37, 'Form Controls', null, null, 'dvr', null, true, 0),
    new Menu (38, 'Autocomplete', '/pages/form-controls/autocomplete', null, 'short_text', null, false, 20),
    new Menu (39, 'Checkbox', '/pages/form-controls/checkbox', null, 'check_box', null, false, 20),
    new Menu (40, 'Datepicker', '/pages/form-controls/datepicker', null, 'today', null, false, 20),
    new Menu (41, 'Form field', '/pages/form-controls/form-field', null, 'view_stream', null, false, 20),
    new Menu (42, 'Input', '/pages/form-controls/input', null, 'input', null, false, 20),
    new Menu (43, 'Radio button', '/pages/form-controls/radio-button', null, 'radio_button_checked', null, false, 20),
    new Menu (44, 'Select', '/pages/form-controls/select', null, 'playlist_add_check', null, false, 20),
    new Menu (45, 'Slider', '/pages/form-controls/slider', null, 'tune', null, false, 20),
    new Menu (46, 'Slide toggle', '/pages/form-controls/slide-toggle', null, 'star_half', null, false, 20),
    new Menu (47, 'Tables', null, null, 'view_module', null, true, 0),
    new Menu (48, 'Basic', '/pages/tables/basic', null, 'view_column', null, false, 30),
    new Menu (49, 'Paging', '/pages/tables/paging', null, 'last_page', null, false, 30),
    new Menu (50, 'Sorting', '/pages/tables/sorting', null, 'sort', null, false, 30),
    new Menu (51, 'Filtering', '/pages/tables/filtering', null, 'format_line_spacing', null, false, 30),
    new Menu (52, 'Selecting', '/pages/tables/selecting', null, 'playlist_add_check', null, false, 30),
    new Menu (53, 'NGX DataTable', '/pages/tables/ngx-table', null, 'view_array', null, false, 30),
    new Menu (54, 'Pages', null, null, 'library_books', null, true, 0),
    new Menu (55, 'Login', '/login', null, 'exit_to_app', null, false, 40),
    new Menu (56, 'Register', '/register', null, 'person_add', null, false, 40),
    new Menu (57, 'Blank', '/blank', null, 'check_box_outline_blank', null, false, 40),
    new Menu (58, 'Page Not Found', '/pagenotfound', null, 'error_outline', null, false, 40),
    new Menu (59, 'Error', '/error', null, 'warning', null, false, 40),
    new Menu (60, 'Search', '/search', null, 'search', null, false, 40),
    new Menu (61, 'Landing', '/landing', null, 'filter', null, false, 40),
    new Menu (50, 'Profile', null, null, 'person', null, true, 40),
    new Menu (51, 'Projects', '/pages/profile/projects', null, 'note', null, false, 50),
    new Menu (52, 'User Info', '/pages/profile/user-info', null, 'perm_contact_calendar', null, false, 50),
    new Menu (55, 'Schedule', '/pages/schedule', null, 'event_note', null, false, 0),
    new Menu (66, 'Maps', null, null, 'map', null, true, 0),
    new Menu (67, 'Google Maps', '/pages/maps/googlemaps', null, 'location_on', null, false, 66),
    new Menu (68, 'Leaflet Maps', '/pages/maps/leafletmaps', null, 'my_location', null, false, 66),
    new Menu (70, 'Charts', null, null, 'multiline_chart', null, true, 0),
    new Menu (71, 'Bar Charts', '/pages/charts/bar', null, 'insert_chart', null, false, 70),
    new Menu (72, 'Pie Charts', '/pages/charts/pie', null, 'pie_chart', null, false, 70),
    new Menu (73, 'Line Charts', '/pages/charts/line', null, 'show_chart', null, false, 70),
    new Menu (74, 'Bubble Charts', '/pages/charts/bubble', null, 'bubble_chart', null, false, 70),
    new Menu (81, 'Drag & Drop', '/pages/drag-drop', null, 'mouse', null, false, 0),
    new Menu (85, 'Material Icons', '/pages/icons', null, 'insert_emoticon', null, false, 0),
    new Menu (140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    new Menu (141, 'Level 2', null, null, 'folder_open', null, true, 140),
    new Menu (142, 'Level 3', null, null, 'folder_open', null, true, 141),
    new Menu (143, 'Level 4', null, null, 'folder_open', null, true, 142),
    new Menu (144, 'Level 5', null, 'http://themeseason.com', 'link', null, false, 143),
    new Menu (200, 'External Link', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 0)
]

export const horizontalMenuItems = [
    new Menu (1, 'Dashboard', '/', null, 'dashboard', null, false, 0),
    new Menu (2, 'Users', '/users', null, 'supervisor_account', null, false, 0),
    new Menu (3, 'UI Features', null, null, 'computer', null, true, 0),
    new Menu (4, 'Buttons', '/pages/ui/buttons', null, 'keyboard', null, false, 3),
    new Menu (5, 'Cards', '/pages/ui/cards', null, 'card_membership', null, false, 3),
    new Menu (6, 'Lists', '/pages/ui/lists', null, 'list', null, false, 3),
    new Menu (7, 'Grids', '/pages/ui/grids', null, 'grid_on', null, false, 3),
    new Menu (8, 'Tabs', '/pages/ui/tabs', null, 'tab', null, false, 3),
    new Menu (9, 'Expansion Panel', '/pages/ui/expansion-panel', null, 'dns', null, false, 3),
    new Menu (10, 'Chips', '/pages/ui/chips', null, 'label', null, false, 3),
    new Menu (11, 'Progress', '/pages/ui/progress', null, 'data_usage', null, false, 3),
    new Menu (12, 'Dialog', '/pages/ui/dialog', null, 'open_in_new', null, false, 3),
    new Menu (13, 'Tooltip', '/pages/ui/tooltip', null, 'chat_bubble', null, false, 3),
    new Menu (14, 'Snackbar', '/pages/ui/snack-bar', null, 'sms', null, false, 3),
    new Menu (16, 'Mailbox', '/pages/mailbox', null, 'email', null, false, 40),
    new Menu (17, 'Chat', '/pages/chat', null, 'chat', null, false, 40),
    new Menu (20, 'Form Controls', null, null, 'dvr', null, true, 0),
    new Menu (21, 'Autocomplete', '/pages/form-controls/autocomplete', null, 'short_text', null, false, 20),
    new Menu (22, 'Checkbox', '/pages/form-controls/checkbox', null, 'check_box', null, false, 20),
    new Menu (23, 'Datepicker', '/pages/form-controls/datepicker', null, 'today', null, false, 20),
    new Menu (24, 'Form field', '/pages/form-controls/form-field', null, 'view_stream', null, false, 20),
    new Menu (25, 'Input', '/pages/form-controls/input', null, 'input', null, false, 20),
    new Menu (26, 'Radio button', '/pages/form-controls/radio-button', null, 'radio_button_checked', null, false, 20),
    new Menu (27, 'Select', '/pages/form-controls/select', null, 'playlist_add_check', null, false, 20),
    new Menu (28, 'Slider', '/pages/form-controls/slider', null, 'tune', null, false, 20),
    new Menu (29, 'Slide toggle', '/pages/form-controls/slide-toggle', null, 'star_half', null, false, 20),
    new Menu (30, 'Tables', null, null, 'view_module', null, true, 0),
    new Menu (31, 'Basic', '/pages/tables/basic', null, 'view_column', null, false, 30),
    new Menu (32, 'Paging', '/pages/tables/paging', null, 'last_page', null, false, 30),
    new Menu (33, 'Sorting', '/pages/tables/sorting', null, 'sort', null, false, 30),
    new Menu (34, 'Filtering', '/pages/tables/filtering', null, 'format_line_spacing', null, false, 30),
    new Menu (35, 'Selecting', '/pages/tables/selecting', null, 'playlist_add_check', null, false, 30),
    new Menu (36, 'NGX DataTable', '/pages/tables/ngx-table', null, 'view_array', null, false, 30),
    new Menu (70, 'Charts', null, null, 'multiline_chart', null, true, 0),
    new Menu (71, 'Bar Charts', '/pages/charts/bar', null, 'insert_chart', null, false, 70),
    new Menu (72, 'Pie Charts', '/pages/charts/pie', null, 'pie_chart', null, false, 70),
    new Menu (73, 'Line Charts', '/pages/charts/line', null, 'show_chart', null, false, 70),
    new Menu (74, 'Bubble Charts', '/pages/charts/bubble', null, 'bubble_chart', null, false, 70),
    new Menu (81, 'Drag & Drop', '/pages/drag-drop', null, 'mouse', null, false, 3),
    new Menu (85, 'Material Icons', '/pages/icons', null, 'insert_emoticon', null, false, 3),
    new Menu (40, 'Pages', null, null, 'library_books', null, true, 0),
    new Menu (43, 'Login', '/login', null, 'exit_to_app', null, false, 40),
    new Menu (44, 'Register', '/register', null, 'person_add', null, false, 40),
    new Menu (45, 'Blank', '/blank', null, 'check_box_outline_blank', null, false, 40),
    new Menu (46, 'Page Not Found', '/pagenotfound', null, 'error_outline', null, false, 40),
    new Menu (47, 'Error', '/error', null, 'warning', null, false, 40),
    new Menu (48, 'Search', '/search', null, 'search', null, false, 40),
    new Menu (49, 'Landing', '/landing', null, 'filter', null, false, 40),
    new Menu (50, 'Profile', null, null, 'person', null, true, 40),
    new Menu (51, 'Projects', '/pages/profile/projects', null, 'note', null, false, 50),
    new Menu (52, 'User Info', '/pages/profile/user-info', null, 'perm_contact_calendar', null, false, 50),
    new Menu (55, 'Schedule', '/pages/schedule', null, 'event_note', null, false, 40),
    new Menu (200, 'External Link', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 40),
    new Menu (66, 'Maps', null, null, 'map', null, true, 0),
    new Menu (67, 'Google', '/pages/maps/googlemaps', null, 'location_on', null, false, 66),
    new Menu (68, 'Leaflet', '/pages/maps/leafletmaps', null, 'my_location', null, false, 66),
]
