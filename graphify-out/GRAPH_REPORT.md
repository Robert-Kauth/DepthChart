# Graph Report - vite-migration  (2026-09-23)

## Corpus Check
- 118 files · ~30,664 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 825 nodes · 1795 edges · 60 communities (43 shown, 17 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.85)
- Token cost: 42,057 input · 0 output

## Community Hubs (Navigation)
- Frontend Package & Components
- Flask Auth Routes
- Redux Store & App Bootstrap
- Server Create/Delete UI
- User API Routes
- Socket Chat UI & Store
- Home & Channel Feed Views
- Deployment, Stack & Entry HTML
- Channels UI & Store
- Formik Auth Forms & Session
- Nav, Login & Splash
- SQLAlchemy Models
- Chat API Routes
- Message API Routes
- Database Seeders
- Messages Redux Slice
- TypeScript Compiler Config
- DM Title Bar & Mutual Servers
- Flask App Setup & CSRF
- New Message Form & Users Slice
- Runtime Dependencies
- Message Feed & Composer
- graphify Watch & Hooks
- Server API Routes
- Channel Edit & Delete UI
- graphify Ingest & Transcribe
- Server Edit Form & Errors
- User-Server Membership API
- App Shell & Routing
- Avatar & User Info
- Friends & Follow UI
- User Model & Follows
- graphify Query Commands
- graphify Build Pipeline
- Alembic Migration Env
- Dev Dependencies
- graphify Export Formats
- Channel Card
- Early Recipient Migrations
- Message Model Defaults
- graphify Extraction Spec
- Vite Node TS Config
- Users & Servers Migrations
- CRUD User Stories
- Message Thread Stub
- Message Table Cleanup Migration
- Auth User Stories
- Flask-Login Requirement
- Flask-SocketIO Requirement

## God Nodes (most connected - your core abstractions)
1. `useAppDispatch` - 53 edges
2. `useAppSelector` - 45 edges
3. `react` - 35 edges
4. `User` - 21 edges
5. `hideModal()` - 21 edges
6. `compilerOptions` - 16 edges
7. `User` - 16 edges
8. `@mdi/js` - 13 edges
9. `ById` - 13 edges
10. `react-router-dom` - 12 edges

## Surprising Connections (you probably didn't know these)
- `graphify claude install (CLAUDE.md integration)` --shares_data_with--> `Project CLAUDE.md graphify section`  [INFERRED]
  .claude/skills/graphify/references/hooks.md → CLAUDE.md
- `psycopg2-binary==2.8.6` --shares_data_with--> `Backend Stack (Python, Flask, PostgreSQL, SQLAlchemy)`  [INFERRED]
  dev-requirements.txt → README.md
- `flask==2.0.1` --shares_data_with--> `Backend Stack (Python, Flask, PostgreSQL, SQLAlchemy)`  [INFERRED]
  requirements.txt → README.md
- `Vite + React + TS entry point` --conceptually_related_to--> `Frontend Stack (HTML, CSS, TypeScript, React, Redux, Vite)`  [INFERRED]
  frontend/index.html → README.md
- `boto3==1.20.7 (S3 asset storage)` --conceptually_related_to--> `DepthChart Overview`  [INFERRED]
  requirements.txt → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Anti-hallucination / grounding design pattern in graphify** — claude_skills_graphify_skill_honesty_rules, claude_skills_graphify_references_query_vocab_expansion, claude_skills_graphify_references_query_answer_grounding [INFERRED 0.75]
- **Unauthenticated Entry Point Pages** — user_stories_wiki_signup_route, user_stories_wiki_login_route, user_stories_wiki_demo_user_feature [INFERRED 0.75]
- **DepthChart Heroku deployment pipeline** — github_workflows_main_heroku_deploy_workflow, readme_depthchart_heroku_app [INFERRED 0.85]
- **Resource CRUD User Story Pattern** — user_stories_wiki_servers_crud_user_stories, user_stories_wiki_channels_crud_user_stories, user_stories_wiki_messages_crud_user_stories, user_stories_wiki_chat_crud_user_stories [INFERRED 0.85]
- **Vite frontend bootstrap (index.html -> #root <- main.tsx)** — frontend_index_html, frontend_index_root, frontend_src_main, frontend_public_reset [INFERRED 0.85]

## Communities (60 total, 17 thin omitted)

### Community 0 - "Frontend Package & Components"
Cohesion: 0.05
Nodes (53): name, @types/react, pnpm, overrides, private, scripts, build, dev (+45 more)

### Community 1 - "Flask Auth Routes"
Cohesion: 0.07
Nodes (46): authenticate(), login(), logout(), route, Creates a new user and logs them in, Simple function that turns the WTForms validation errors into a simple list, Returns unauthorized JSON when flask-login authentication fails, Authenticates a user. (+38 more)

### Community 2 - "Redux Store & App Bootstrap"
Cohesion: 0.08
Nodes (33): frontend_src_index, Root(), store, Window, reducer(), AppDispatch, AppStore, AppThunk (+25 more)

### Community 3 - "Server Create/Delete UI"
Cohesion: 0.10
Nodes (25): CreateServerForm(), frontend_src_components_createserverform_createserverform_module, frontend_src_components_serverdeletebutton_serverdeletebutton_module, ServerDeleteButton(), frontend_src_components_servers_servers_module, Servers(), frontend_src_components_servertile_servertile_module, ServerTile() (+17 more)

### Community 4 - "User API Routes"
Cohesion: 0.12
Nodes (22): delete_user(), follow_user(), login_required, route, Returns normalized Users data, Finds user by id and returns user dict, Unfollows another user, unfollow_user() (+14 more)

### Community 5 - "Socket Chat UI & Store"
Cohesion: 0.12
Nodes (23): Chat(), frontend_src_components_chat_chat_module, SocketChat, ChatButton(), frontend_src_components_chatbutton_chatbutton_module, add(), addChat(), ChatAction (+15 more)

### Community 6 - "Home & Channel Feed Views"
Cohesion: 0.16
Nodes (14): ChannelFeed(), ChannelMessages(), Friends(), Home(), frontend_src_components_home_home_module, Main(), MainProps, frontend_src_components_main_main_module (+6 more)

### Community 7 - "Deployment, Stack & Entry HTML"
Cohesion: 0.10
Nodes (25): psycopg2-binary==2.8.6, Vite index.html entry, Open Graph Metadata, #root mount div, Vite + React + TS entry point, reset.css, Heroku Container Registry (depthchart app), Push Container to Heroku workflow (+17 more)

### Community 8 - "Channels UI & Store"
Cohesion: 0.13
Nodes (18): Channels(), frontend_src_components_channels_channels_module, CreateChannelForm(), ChannelAction, ChannelEdit, ChannelsState, create(), createChannel() (+10 more)

### Community 9 - "Formik Auth Forms & Session"
Cohesion: 0.15
Nodes (18): frontend_src_components_formik_index_liveemailvalidation, frontend_src_components_formik_index_liveusernamevalidation, frontend_src_components_formik_index_textinput, frontend_src_components_login_loginform_module, frontend_src_components_signup_signupform_module, authenticate(), createSession(), demoLogin() (+10 more)

### Community 10 - "Nav, Login & Splash"
Cohesion: 0.17
Nodes (13): LoginForm(), frontend_src_components_nav_navbar_module, NavBar(), SignupForm(), frontend_src_components_splashpage_splashpage_module, SplashPage(), Button, StyledButtonProps (+5 more)

### Community 11 - "SQLAlchemy Models"
Cohesion: 0.22
Nodes (7): Channel, Server, seed_channels(), seed_servers(), faker, flask_sqlalchemy, random

### Community 12 - "Chat API Routes"
Cohesion: 0.16
Nodes (17): add_chat(), delete_chat(), load_chat(), load_chats(), login_required, route, Function to test and debug routes, Simple function that turns the WTForms validation errors into a simple list (+9 more)

### Community 13 - "Message API Routes"
Cohesion: 0.17
Nodes (18): create_message(), load_channel_messages(), load_message(), load_messages_for_users(), load_user_messages(), login_required, route, Function to test and debug routes (+10 more)

### Community 14 - "Database Seeders"
Cohesion: 0.20
Nodes (16): Message, undo_channels(), seed(), undo(), Seeds channel_messages, seed_channel_messages(), seed_user_messages(), undo_channel_messages() (+8 more)

### Community 15 - "Messages Redux Slice"
Cohesion: 0.15
Nodes (18): create(), createMessage(), destroy(), destroyMessage(), edit(), editMessage(), initialState, loadAll() (+10 more)

### Community 16 - "TypeScript Compiler Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+10 more)

### Community 17 - "DM Title Bar & Mutual Servers"
Cohesion: 0.20
Nodes (10): FeedTitleBarProps, frontend_src_components_feedtitlebar_feedtitlebar_module, frontend_src_components_messages_messages_module, frontend_src_components_mutualservers_mutualservers_module, MutualServers(), StyledButton(), frontend_src_components_title_title_module, Title() (+2 more)

### Community 18 - "Flask App Setup & CSRF"
Cohesion: 0.12
Nodes (14): after_request, https_redirect(), inject_csrf_token(), load_user(), route, Sends favicon if requested and react app otherwise, Changes request made in production from http to https, Injects csrf_token into response and sets CORS options in production (+6 more)

### Community 19 - "New Message Form & Users Slice"
Cohesion: 0.17
Nodes (13): Button, frontend_src_components_newmessageform_newmessageform_module, NewMessageForm(), StyledIcon, destroyOne(), destroyUser(), initialState, loadAll() (+5 more)

### Community 20 - "Runtime Dependencies"
Cohesion: 0.13
Nodes (15): dependencies, formik, @mdi/js, @mdi/react, react, react-dom, react-icons, react-redux (+7 more)

### Community 21 - "Message Feed & Composer"
Cohesion: 0.19
Nodes (8): CreateMessageBar(), FeedTitleBar(), MessageCard(), frontend_src_components_messagecard_messagecard_module, frontend_src_components_messagefeed_messagefeed_module, MessageFeedCard(), frontend_src_components_messagefeedcard_messagefeedcard_module, Message

### Community 22 - "graphify Watch & Hooks"
Cohesion: 0.19
Nodes (11): /graphify Trigger Instruction, /graphify add <url>, --watch background watcher, graphify.watch module, graphify claude install (CLAUDE.md integration), graphify hook install (post-commit hook), --cluster-only, --update incremental re-extraction (+3 more)

### Community 23 - "Server API Routes"
Cohesion: 0.31
Nodes (12): create_server(), destroyServer(), editServer(), loadServer(), loadServers(), login_required, route, Simple function that turns the WTForms validation errors into a simple list (+4 more)

### Community 24 - "Channel Edit & Delete UI"
Cohesion: 0.26
Nodes (7): DeleteChannelButton(), frontend_src_components_deletechannelbutton_deletechannelbutton_module, EditChannelForm(), frontend_src_components_editchannelform_editchannelform_module, Modal(), frontend_src_components_modal_modal_module, hideModal()

### Community 25 - "graphify Ingest & Transcribe"
Cohesion: 0.17
Nodes (9): graphify clone <url>, graphify merge-graphs, Video/audio transcription flow, Step 0 - GitHub repos and multi-path merge, Step 1 - Ensure graphify is installed, Step 2.5 - Video and audio, Step 2 - Detect files, Step 3 - Extract entities and relationships (+1 more)

### Community 26 - "Server Edit Form & Errors"
Cohesion: 0.23
Nodes (7): frontend_src_components_createchannelform_createchannelform_module, Button, EditServerForm(), frontend_src_components_editserverform_editserverform_module, StyledIcon, Errors(), frontend_src_components_errors_errors_module

### Community 27 - "User-Server Membership API"
Cohesion: 0.31
Nodes (9): delete_user_server(), joinServer(), loadServerUsers(), loadUserServers(), login_required, route, Adds server to users servers and returns new server, Deletes server from user servers (+1 more)

### Community 28 - "App Shell & Routing"
Cohesion: 0.29
Nodes (6): App(), frontend_src_app_module, ProtectedRoute(), Footer(), frontend_src_components_footer_footer_module, react-router-dom

### Community 29 - "Avatar & User Info"
Cohesion: 0.29
Nodes (5): Avatar(), frontend_src_components_avatar_avatar_module, frontend_src_components_channelmessages_channelmessages_module, frontend_src_components_userinfo_userinfo_module, UserInfo()

### Community 30 - "Friends & Follow UI"
Cohesion: 0.29
Nodes (5): FollowButton(), frontend_src_components_followbutton_followbutton_module, FriendCard(), frontend_src_components_friendcard_friendcard_module, frontend_src_components_friends_friends_module

### Community 31 - "User Model & Follows"
Cohesion: 0.28
Nodes (3): User, setter, UserMixin

### Community 32 - "graphify Query Commands"
Cohesion: 0.31
Nodes (9): Project CLAUDE.md graphify section, Answer only from graph contents - no hallucination, graphify explain command, graphify path command, graphify query command + vocab expansion, graphify save-result / work-memory feedback loop, Constrained query expansion step, graph.json output (+1 more)

### Community 33 - "graphify Build Pipeline"
Cohesion: 0.31
Nodes (6): GRAPH_REPORT.md output, graphify.export.to_json(), graphify.report.generate(), Step 4.5 - Graph health check, Step 4 - Build graph, cluster, analyze, generate outputs, Step 5 - Label communities

### Community 34 - "Alembic Migration Env"
Cohesion: 0.22
Nodes (7): flask, logging, logging_config, Run migrations in 'offline' mode. This configures the context with just a URL…, Run migrations in 'online' mode. In this scenario we need to create an Engine…, run_migrations_offline(), run_migrations_online()

### Community 35 - "Dev Dependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @types/react, @types/react-dom, @types/react-router-dom, @types/redux-logger, @types/styled-components, typescript, vite (+1 more)

### Community 36 - "graphify Export Formats"
Cohesion: 0.25
Nodes (8): graphify benchmark - token reduction, graphify export falkordb / --falkordb-push, graphify.serve MCP stdio server, graphify export neo4j / --neo4j-push, graphify export svg/graphml, graphify export wiki, Step 6 - Obsidian vault + HTML outputs, graphify-out/wiki/index.md

### Community 37 - "Channel Card"
Cohesion: 0.36
Nodes (5): ChannelCard(), frontend_src_components_channelcard_channelcard_module, loadAllChannelMessages(), loadChannel(), Channel

### Community 39 - "Message Model Defaults"
Cohesion: 0.29
Nodes (3): datetime, flask_login, werkzeug_security

### Community 40 - "graphify Extraction Spec"
Cohesion: 0.29
Nodes (5): Confidence score rubric, Node ID format rule, Extraction subagent prompt/schema, Gemini semantic extraction backend, Part B - Semantic extraction (parallel subagents)

### Community 41 - "Vite Node TS Config"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 43 - "CRUD User Stories"
Cohesion: 0.73
Nodes (6): Channels CRUD User Stories, Chat CRUD User Stories, / (Home) Page, Messages CRUD User Stories, /servers/:serverId Page, Servers CRUD User Stories

### Community 46 - "Auth User Stories"
Cohesion: 0.83
Nodes (4): Demo User Feature, /login Page, /signup Page, Users User Stories

## Knowledge Gaps
- **119 isolated node(s):** `allowJs`, `allowSyntheticDefaultImports`, `esModuleInterop`, `forceConsistentCasingInFileNames`, `isolatedModules` (+114 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 285 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Frontend Package & Components` to `Redux Store & App Bootstrap`, `Server Create/Delete UI`, `Channel Card`, `Home & Channel Feed Views`, `Socket Chat UI & Store`, `Channels UI & Store`, `Formik Auth Forms & Session`, `Nav, Login & Splash`, `DM Title Bar & Mutual Servers`, `New Message Form & Users Slice`, `Channel Edit & Delete UI`, `Server Edit Form & Errors`, `App Shell & Routing`, `Avatar & User Info`, `Friends & Follow UI`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `useAppDispatch` connect `Home & Channel Feed Views` to `Frontend Package & Components`, `Redux Store & App Bootstrap`, `Server Create/Delete UI`, `Socket Chat UI & Store`, `Channel Card`, `Channels UI & Store`, `Formik Auth Forms & Session`, `Nav, Login & Splash`, `DM Title Bar & Mutual Servers`, `New Message Form & Users Slice`, `Message Feed & Composer`, `Channel Edit & Delete UI`, `Server Edit Form & Errors`, `App Shell & Routing`, `Avatar & User Info`, `Friends & Follow UI`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `Vite index.html entry` connect `Deployment, Stack & Entry HTML` to `Redux Store & App Bootstrap`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `allowJs`, `allowSyntheticDefaultImports`, `esModuleInterop` to the rest of the system?**
  _119 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Frontend Package & Components` be split into smaller, more focused modules?**
  _Cohesion score 0.05403508771929825 - nodes in this community are weakly interconnected._
- **Should `Flask Auth Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.06533575317604355 - nodes in this community are weakly interconnected._
- **Should `Redux Store & App Bootstrap` be split into smaller, more focused modules?**
  _Cohesion score 0.07777777777777778 - nodes in this community are weakly interconnected._