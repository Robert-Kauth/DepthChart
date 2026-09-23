# Graph Report - DepthChart  (2026-09-23)

## Corpus Check
- 1 files · ~31,820 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 890 nodes · 1692 edges · 64 communities (44 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.85)
- Token cost: 0 input · 45,746 output

## Community Hubs (Navigation)
- React App Shell & Routing
- Vite React App Entry & UI
- React App Package Config
- Auth Routes (Flask)
- Babel Dev Dependencies
- Channels & Create Channel UI
- Server Create/Edit Forms
- User Routes (Flask)
- Vite Frontend Package Config
- Material/Build Dependencies
- Channel & Chat Models
- Chat UI Components
- Message Routes (Flask)
- Deployment & Build Pipeline
- TypeScript Compiler Config
- Chat Routes (Flask)
- Message Model & Seeds
- Channel Card & Message API
- Flask App Bootstrap
- Server Routes (Flask)
- graphify Add/Watch/Hooks
- Avatar & Channel Messages UI
- Feed Title & Mutual Servers UI
- Channel Routes (Flask)
- User-Server Routes (Flask)
- Friends & Users API
- User Model
- graphify Clone/Merge/Transcribe
- User-Servers Redux Slice
- Channel Feed & Server Layout UI
- graphify Query & Honesty Rules
- graphify Build & Analyze Pipeline
- Message Card UI
- graphify Exports (Neo4j/FalkorDB/Wiki)
- Alembic Migration Env
- npm Scripts
- Follow & Friend Card UI
- Home Page & Message Feed UI
- Messages UI & API
- Server/UserServer Migrations
- graphify Extraction Spec & Cache
- TS Node Config
- Users/Join Migrations
- Channel/Chat/Message User Stories
- User-Message Migration
- Auth & Demo User Stories
- Babel Config
- Browserslist Config
- ESLint Config
- Vite Logo Asset
- React Logo Asset
- flask-login Dependency
- flask-socketio Dependency

## God Nodes (most connected - your core abstractions)
1. `react-redux` - 35 edges
2. `hideModal()` - 25 edges
3. `User` - 21 edges
4. `compilerOptions` - 16 edges
5. `react-router-dom` - 14 edges
6. `@mdi/js` - 13 edges
7. `Errors()` - 10 edges
8. `graphify (/graphify command)` - 10 edges
9. `Step 4 - Build graph, cluster, analyze, generate outputs` - 10 edges
10. `User_server` - 9 edges

## Surprising Connections (you probably didn't know these)
- `DepthChart CRA landing page (index.html)` --semantically_similar_to--> `Vite + React + TS entry point`  [INFERRED] [semantically similar]
  react-app/public/index.html → frontend/index.html
- `graphify claude install (CLAUDE.md integration)` --shares_data_with--> `Project CLAUDE.md graphify section`  [INFERRED]
  .claude/skills/graphify/references/hooks.md → CLAUDE.md
- `boto3==1.20.7 (S3 asset storage)` --conceptually_related_to--> `DepthChart Overview`  [INFERRED]
  requirements.txt → README.md
- `Project CLAUDE.md graphify section` --references--> `graphify-out/wiki/index.md`  [EXTRACTED]
  CLAUDE.md → .claude/skills/graphify/SKILL.md
- `psycopg2-binary==2.8.6` --shares_data_with--> `Backend stack (Python, Flask, PostgreSQL, SQLAlchemy)`  [INFERRED]
  dev-requirements.txt → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Anti-hallucination / grounding design pattern in graphify** — claude_skills_graphify_skill_honesty_rules, claude_skills_graphify_references_query_vocab_expansion, claude_skills_graphify_references_query_answer_grounding [INFERRED 0.75]
- **DepthChart Heroku deployment pipeline** — github_workflows_main_heroku_deploy_workflow, readme_depthchart_heroku_app, react_app_readme_heroku_postbuild [INFERRED 0.85]
- **Resource CRUD User Story Pattern** — user_stories_wiki_servers_crud_user_stories, user_stories_wiki_channels_crud_user_stories, user_stories_wiki_messages_crud_user_stories, user_stories_wiki_chat_crud_user_stories [INFERRED 0.85]
- **Unauthenticated Entry Point Pages** — user_stories_wiki_signup_route, user_stories_wiki_login_route, user_stories_wiki_demo_user_feature [INFERRED 0.75]

## Communities (64 total, 20 thin omitted)

### Community 0 - "React App Shell & Routing"
Cohesion: 0.06
Nodes (48): App(), react_app_src_app_module, ProtectedRoute(), EditServerForm(), Footer(), react_app_src_components_footer_footer_module, react_app_src_components_formik_index_liveemailvalidation, react_app_src_components_formik_index_liveusernamevalidation (+40 more)

### Community 1 - "Vite React App Entry & UI"
Cohesion: 0.07
Nodes (38): App(), frontend_src_assets_react, frontend_src_index, Button, CreateMessageBar(), react_app_src_components_createmessagebar_createmessagebar_module, StyledIcon, react_app_src_components_formik_formik_module (+30 more)

### Community 2 - "React App Package Config"
Cohesion: 0.04
Nodes (52): react, react-dom, name, private, proxy, version, autoprefixer, @babel/cli (+44 more)

### Community 3 - "Auth Routes (Flask)"
Cohesion: 0.08
Nodes (34): authenticate(), login(), logout(), route, Creates a new user and logs them in, Simple function that turns the WTForms validation errors into a simple list, Returns unauthorized JSON when flask-login authentication fails, Authenticates a user. (+26 more)

### Community 4 - "Babel Dev Dependencies"
Cohesion: 0.06
Nodes (34): devDependencies, autoprefixer, @babel/cli, @babel/core, babel-loader, @babel/plugin-proposal-export-default-from, babel-plugin-styled-components, @babel/preset-env (+26 more)

### Community 5 - "Channels & Create Channel UI"
Cohesion: 0.11
Nodes (22): Channels(), react_app_src_components_channels_channels_module, CreateChannelForm(), react_app_src_components_createchannelform_createchannelform_module, DeleteChannelButton(), react_app_src_components_deletechannelbutton_deletechannelbutton_module, EditChannelForm(), react_app_src_components_editchannelform_editchannelform_module (+14 more)

### Community 6 - "Server Create/Edit Forms"
Cohesion: 0.10
Nodes (23): CreateServerForm(), react_app_src_components_createserverform_createserverform_module, Button, react_app_src_components_editserverform_editserverform_module, StyledIcon, react_app_src_components_serverdeletebutton_serverdeletebutton_module, ServerDeleteButton(), react_app_src_components_servers_servers_module (+15 more)

### Community 7 - "User Routes (Flask)"
Cohesion: 0.12
Nodes (22): delete_user(), follow_user(), login_required, route, Returns normalized Users data, Finds user by id and returns user dict, Unfollows another user, unfollow_user() (+14 more)

### Community 8 - "Vite Frontend Package Config"
Cohesion: 0.08
Nodes (24): dependencies, react, react-dom, devDependencies, @types/react, @types/react-dom, typescript, vite (+16 more)

### Community 9 - "Material/Build Dependencies"
Cohesion: 0.08
Nodes (26): dependencies, core-js, dotenv, formik, http-proxy-middleware, material-components-web, material-symbols, @material-symbols/svg-400 (+18 more)

### Community 10 - "Channel & Chat Models"
Cohesion: 0.18
Nodes (7): Channel, Chat, seed_channels(), datetime, faker, flask_sqlalchemy, random

### Community 11 - "Chat UI Components"
Cohesion: 0.15
Nodes (17): Chat(), react_app_src_components_chat_chat_module, ChatButton(), react_app_src_components_chatbutton_chatbutton_module, add(), addChat(), destroy(), destroyChat() (+9 more)

### Community 12 - "Message Routes (Flask)"
Cohesion: 0.17
Nodes (18): create_message(), load_channel_messages(), load_message(), load_messages_for_users(), load_user_messages(), login_required, route, Function to test and debug routes (+10 more)

### Community 13 - "Deployment & Build Pipeline"
Cohesion: 0.12
Nodes (19): psycopg2-binary==2.8.6, Vite + React + TS entry point, Heroku Container Registry (depthchart app), Push Container to Heroku workflow, DepthChart CRA landing page (index.html), Create React App bootstrap notes, REACT_APP_BASE_URL environment variable, heroku-postbuild build script (+11 more)

### Community 14 - "TypeScript Compiler Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+10 more)

### Community 15 - "Chat Routes (Flask)"
Cohesion: 0.18
Nodes (16): add_chat(), delete_chat(), load_chat(), load_chats(), login_required, route, Function to test and debug routes, Simple function that turns the WTForms validation errors into a simple list (+8 more)

### Community 16 - "Message Model & Seeds"
Cohesion: 0.20
Nodes (15): Message, undo_channels(), seed(), undo(), Seeds channel_messages, seed_channel_messages(), seed_user_messages(), undo_channel_messages() (+7 more)

### Community 17 - "Channel Card & Message API"
Cohesion: 0.18
Nodes (14): ChannelCard(), react_app_src_components_channelcard_channelcard_module, create(), createMessage(), destroy(), destroyMessage(), edit(), editMessage() (+6 more)

### Community 18 - "Flask App Bootstrap"
Cohesion: 0.12
Nodes (14): after_request, https_redirect(), inject_csrf_token(), load_user(), route, Sends favicon if requested and react app otherwise, Changes request made in production from http to https, Injects csrf_token into response and sets CORS options in production (+6 more)

### Community 19 - "Server Routes (Flask)"
Cohesion: 0.23
Nodes (14): create_server(), destroyServer(), editServer(), loadServer(), loadServers(), login_required, route, Simple function that turns the WTForms validation errors into a simple list (+6 more)

### Community 20 - "graphify Add/Watch/Hooks"
Cohesion: 0.19
Nodes (11): /graphify Trigger Instruction, /graphify add <url>, --watch background watcher, graphify.watch module, graphify claude install (CLAUDE.md integration), graphify hook install (post-commit hook), --cluster-only, --update incremental re-extraction (+3 more)

### Community 21 - "Avatar & Channel Messages UI"
Cohesion: 0.21
Nodes (8): Avatar(), react_app_src_components_avatar_avatar_module, ChannelMessages(), react_app_src_components_channelmessages_channelmessages_module, react_app_src_components_userinfo_userinfo_module, UserInfo(), loadOne(), loadUser()

### Community 22 - "Feed Title & Mutual Servers UI"
Cohesion: 0.23
Nodes (7): FeedTitleBar(), react_app_src_components_feedtitlebar_feedtitlebar_module, react_app_src_components_messagefeed_messagefeed_module, react_app_src_components_mutualservers_mutualservers_module, MutualServers(), react_app_src_components_title_title_module, Title()

### Community 23 - "Channel Routes (Flask)"
Cohesion: 0.31
Nodes (12): create_channel(), destroyChannel(), editChannel(), loadChanels(), loadChannel(), login_required, route, Simple function that turns the WTForms validation errors into a simple list (+4 more)

### Community 24 - "User-Server Routes (Flask)"
Cohesion: 0.24
Nodes (11): delete_user_server(), joinServer(), loadServerUsers(), loadUserServers(), login_required, route, Adds server to users servers and returns new server, Deletes server from user servers (+3 more)

### Community 25 - "Friends & Users API"
Cohesion: 0.23
Nodes (10): Friends(), react_app_src_components_friends_friends_module, destroyOne(), destroyUser(), initialState, loadAll(), loadUsers(), reducer() (+2 more)

### Community 26 - "User Model"
Cohesion: 0.20
Nodes (5): User, flask_login, setter, UserMixin, werkzeug_security

### Community 27 - "graphify Clone/Merge/Transcribe"
Cohesion: 0.17
Nodes (9): graphify clone <url>, graphify merge-graphs, Video/audio transcription flow, Step 0 - GitHub repos and multi-path merge, Step 1 - Ensure graphify is installed, Step 2.5 - Video and audio, Step 2 - Detect files, Step 3 - Extract entities and relationships (+1 more)

### Community 28 - "User-Servers Redux Slice"
Cohesion: 0.25
Nodes (10): add(), addUserServer(), destroy(), destroyUserServer(), get(), getUserServers(), initialState, load() (+2 more)

### Community 29 - "Channel Feed & Server Layout UI"
Cohesion: 0.29
Nodes (5): ChannelFeed(), Main(), react_app_src_components_main_main_module, react_app_src_components_server_server_module, Server()

### Community 30 - "graphify Query & Honesty Rules"
Cohesion: 0.31
Nodes (9): Project CLAUDE.md graphify section, Answer only from graph contents - no hallucination, graphify explain command, graphify path command, graphify query command + vocab expansion, graphify save-result / work-memory feedback loop, Constrained query expansion step, graph.json output (+1 more)

### Community 31 - "graphify Build & Analyze Pipeline"
Cohesion: 0.31
Nodes (6): GRAPH_REPORT.md output, graphify.export.to_json(), graphify.report.generate(), Step 4.5 - Graph health check, Step 4 - Build graph, cluster, analyze, generate outputs, Step 5 - Label communities

### Community 32 - "Message Card UI"
Cohesion: 0.28
Nodes (5): MessageCard(), react_app_src_components_messagecard_messagecard_module, MessageFeedCard(), react_app_src_components_messagefeedcard_messagefeedcard_module, react-redux

### Community 33 - "graphify Exports (Neo4j/FalkorDB/Wiki)"
Cohesion: 0.25
Nodes (8): graphify benchmark - token reduction, graphify export falkordb / --falkordb-push, graphify.serve MCP stdio server, graphify export neo4j / --neo4j-push, graphify export svg/graphml, graphify export wiki, Step 6 - Obsidian vault + HTML outputs, graphify-out/wiki/index.md

### Community 34 - "Alembic Migration Env"
Cohesion: 0.25
Nodes (6): logging, logging_config, Run migrations in 'offline' mode. This configures the context with just a URL…, Run migrations in 'online' mode. In this scenario we need to create an Engine…, run_migrations_offline(), run_migrations_online()

### Community 35 - "npm Scripts"
Cohesion: 0.25
Nodes (8): scripts, build, build-dictionary, eject, lint:css, start, stylelint-check, test

### Community 36 - "Follow & Friend Card UI"
Cohesion: 0.36
Nodes (4): FollowButton(), react_app_src_components_followbutton_followbutton_module, FriendCard(), react_app_src_components_friendcard_friendcard_module

### Community 37 - "Home Page & Message Feed UI"
Cohesion: 0.36
Nodes (5): Home(), react_app_src_components_home_home_module, MessageFeed(), loadAll(), loadAllUserMessages()

### Community 38 - "Messages UI & API"
Cohesion: 0.36
Nodes (5): Messages(), react_app_src_components_messages_messages_module, NewMessageForm(), loadBetween(), loadMessagesBetween()

### Community 40 - "graphify Extraction Spec & Cache"
Cohesion: 0.29
Nodes (5): Confidence score rubric, Node ID format rule, Extraction subagent prompt/schema, Gemini semantic extraction backend, Part B - Semantic extraction (parallel subagents)

### Community 41 - "TS Node Config"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 43 - "Channel/Chat/Message User Stories"
Cohesion: 0.73
Nodes (6): Channels CRUD User Stories, Chat CRUD User Stories, / (Home) Page, Messages CRUD User Stories, /servers/:serverId Page, Servers CRUD User Stories

### Community 45 - "Auth & Demo User Stories"
Cohesion: 0.83
Nodes (4): Demo User Feature, /login Page, /signup Page, Users User Stories

### Community 57 - "Browserslist Config"
Cohesion: 0.67
Nodes (3): browserslist, development, production

## Knowledge Gaps
- **204 isolated node(s):** `Button`, `StyledIcon`, `Button`, `StyledIcon`, `Button` (+199 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 372 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-redux` connect `Message Card UI` to `React App Shell & Routing`, `Vite React App Entry & UI`, `React App Package Config`, `Channels & Create Channel UI`, `Server Create/Edit Forms`, `Home Page & Message Feed UI`, `Messages UI & API`, `Chat UI Components`, `Channel Card & Message API`, `Avatar & Channel Messages UI`, `Feed Title & Mutual Servers UI`, `Friends & Users API`, `Channel Feed & Server Layout UI`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Babel Dev Dependencies` to `React App Package Config`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Material/Build Dependencies` to `React App Package Config`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `Button`, `StyledIcon`, `Button` to the rest of the system?**
  _204 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `React App Shell & Routing` be split into smaller, more focused modules?**
  _Cohesion score 0.06316590563165905 - nodes in this community are weakly interconnected._
- **Should `Vite React App Entry & UI` be split into smaller, more focused modules?**
  _Cohesion score 0.06634615384615385 - nodes in this community are weakly interconnected._
- **Should `React App Package Config` be split into smaller, more focused modules?**
  _Cohesion score 0.03773584905660377 - nodes in this community are weakly interconnected._