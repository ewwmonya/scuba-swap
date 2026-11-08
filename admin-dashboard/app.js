const STORE_KEY = 'scubaswap_project_desk_v1';
const SESSION_KEY = 'scubaswap_admin_session_v1';
const starterMilestones = [
  { title: 'Project foundation & roadmap', detail: 'Define the first release and its core user flow.', status: 'Complete' },
  { title: 'Database schema & relationships', detail: 'Set up the core tables and connect related records.', status: 'In progress' },
  { title: 'Authentication & user profiles', detail: 'Let divers create accounts and manage their profiles.', status: 'Planned' },
  { title: 'Community posts & dive logs', detail: 'Build the feed and shared dive log experience.', status: 'Planned' },
  { title: 'Comments & community replies', detail: 'Give members a way to respond and connect.', status: 'Planned' },
  { title: 'Gear listings & swap flow', detail: 'Create the listing, discovery, and exchange flow.', status: 'Planned' },
  { title: 'Admin tools & moderation', detail: 'Review posts, support members, and manage reports.', status: 'Planned' },
  { title: 'Launch, feedback & polish', detail: 'Test the full experience and prepare for launch.', status: 'Planned' }
];
let state = loadState();
let posts = [];
let postHasMore = false;
let postTotal = null;
let authSession = loadSession();
let toastTimer;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    return {
      connection: saved.connection || null,
      milestones: Array.isArray(saved.milestones) ? saved.milestones : structuredClone(starterMilestones),
      status: saved.status || 'In progress'
    };
  } catch { return { connection: null, milestones: structuredClone(starterMilestones), status: 'In progress' }; }
}
function saveState() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
function loadSession() { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; } }
function saveSession(value) { authSession = value; value ? sessionStorage.setItem(SESSION_KEY, JSON.stringify(value)) : sessionStorage.removeItem(SESSION_KEY); }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch])); }
function safeDate(value) { if (!value) return ''; const date = new Date(value); return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString(undefined, { month:'short', day:'numeric', year:'numeric' }); }
function firstValue(row, keys) { const key = keys.find(k => row?.[k] !== undefined && row[k] !== null && row[k] !== ''); return key ? row[key] : ''; }
function shortText(value, limit=360) { const str = String(value ?? ''); return str.length > limit ? str.slice(0, limit) + '…' : str; }
function toast(message) { const el=document.getElementById('toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),2800); }
function showMessage(id, message, type='error') { const el=document.getElementById(id); el.hidden=!message; el.className=type==='success'?'form-success':'form-error'; el.textContent=message; }
function getProgress() { const all=state.milestones.length, done=state.milestones.filter(m=>m.status==='Complete').length; return { all, done, percent:all?Math.round(done/all*100):0 }; }

function render() {
  renderConnection(); renderProgress(); renderPosts();
}
function renderConnection() {
  const connected=Boolean(state.connection?.url && state.connection?.key);
  document.getElementById('sidebarConnection').classList.toggle('connected',connected);
  document.getElementById('sidebarConnText').textContent=connected?new URL(state.connection.url).hostname:'Not connected';
  document.getElementById('connectionBadge').classList.toggle('connected',connected);
  document.getElementById('connectionBadge').innerHTML=`<span class="tiny-dot"></span> ${connected?'Connected':'Not connected'}`;
  document.getElementById('connectNotice').hidden=connected;
  document.getElementById('postsTableName').textContent=state.connection?.table || 'posts';
  if (connected) {
    document.getElementById('projectUrl').value=state.connection.url;
    document.getElementById('anonKey').value=state.connection.key;
    document.getElementById('tableName').value=state.connection.table || 'posts';
  }
  document.getElementById('signOut').hidden=!authSession;
}
function renderProgress() {
  const p=getProgress();
  document.getElementById('completionValue').innerHTML=`${p.percent}<span>%</span>`;
  document.getElementById('completionBar').style.width=`${p.percent}%`;
  document.getElementById('completionFoot').textContent=`${p.done} of ${p.all} milestones complete`;
  document.getElementById('progressSummaryValue').textContent=`${p.percent}%`;
  document.getElementById('progressSummaryBar').style.width=`${p.percent}%`;
  document.getElementById('progressSummaryNote').textContent=`${p.done} of ${p.all} milestones complete`;
  document.getElementById('projectStatus').textContent=state.status;
  document.getElementById('progressSummaryStatus').textContent=state.status;
  document.getElementById('projectStatusSelect').value=state.status;
  document.getElementById('milestoneCount').textContent=`${p.all} item${p.all===1?'':'s'}`;
  const next=state.milestones.find(m=>m.status!=='Complete');
  document.getElementById('nextTitle').textContent=next?.title || 'All milestones complete';
  document.getElementById('nextDescription').textContent=next?.detail || 'Nice work. Add another milestone whenever a new phase begins.';
  const compact=state.milestones.slice(0,5);
  document.getElementById('overviewMilestones').innerHTML=compact.length?compact.map((m,i)=>milestoneHTML(m,i,false)).join(''):'<div class="empty-state small"><strong>No milestones yet</strong><p>Add your first milestone to start tracking.</p></div>';
  document.getElementById('fullMilestones').innerHTML=state.milestones.length?state.milestones.map((m,i)=>milestoneHTML(m,i,true)).join(''):'<div class="empty-state small"><strong>No milestones yet</strong><p>Add your first milestone to start tracking.</p></div>';
  document.querySelectorAll('[data-milestone-index]').forEach(el=>el.addEventListener('click',()=>{
    const index=Number(el.dataset.milestoneIndex); const m=state.milestones[index];
    m.status=m.status==='Complete'?'Planned':(m.status==='In progress'?'Complete':'In progress'); saveState(); renderProgress();
  }));
  document.querySelectorAll('[data-delete-milestone]').forEach(el=>el.addEventListener('click',()=>{state.milestones.splice(Number(el.dataset.deleteMilestone),1);saveState();renderProgress();toast('Milestone removed');}));
}
function milestoneHTML(m,i,full) {
  const complete=m.status==='Complete', statusClass=complete?'complete':m.status==='In progress'?'in-progress':'';
  return `<div class="milestone-row"><button class="milestone-check ${complete?'done':''}" data-milestone-index="${i}" aria-label="Change ${escapeHtml(m.title)} status">${complete?'✓':''}</button><div class="milestone-info"><strong>${escapeHtml(m.title)}</strong><small>${escapeHtml(m.detail||'')}</small></div><span class="milestone-status ${statusClass}">${escapeHtml(m.status)}</span>${full?`<button class="milestone-delete" data-delete-milestone="${i}" aria-label="Delete milestone">×</button>`:''}</div>`;
}
function renderPosts() {
  const count=posts.length, visibleCount=postTotal??(postHasMore?`${count}+`:String(count));
  document.getElementById('postsValue').textContent=state.connection?String(visibleCount):'—';
  document.getElementById('postsFoot').textContent=state.connection?(count?`${count} loaded from Supabase`:'No rows returned'):'Connect Supabase to load';
  document.getElementById('postNavCount').textContent=state.connection?String(visibleCount):'—';
  document.getElementById('postsTitleCount').textContent=state.connection?`(${visibleCount})`:'';
  const query=document.getElementById('postSearch').value.trim().toLowerCase();
  let list=posts.filter(row=>!query||JSON.stringify(row).toLowerCase().includes(query));
  const sort=document.getElementById('postSort').value;
  list=list.slice().sort((a,b)=>{const da=Date.parse(firstValue(a,['created_at','createdAt','published_at','date'])||0)||0;const db=Date.parse(firstValue(b,['created_at','createdAt','published_at','date'])||0)||0;return sort==='oldest'?da-db:db-da;});
  document.getElementById('postsGrid').innerHTML=list.length?list.map(postCard).join(''):state.connection?`<div class="empty-state"><span class="empty-icon">⌕</span><strong>${query?'No matching posts':'No posts found'}</strong><p>${query?'Try another search term.':'The table returned no rows. Check your table name or add a post in your app.'}</p></div>`:`<div class="empty-state"><span class="empty-icon">▤</span><strong>Connect Supabase to see your posts</strong><p>Use your project URL and publishable key. Your posts will appear here as soon as access is set up.</p><button class="button button-dark" data-goto="connection">Set up connection <span>→</span></button></div>`;
  document.getElementById('loadMoreRow').hidden=!state.connection||!postHasMore||Boolean(query);
  document.getElementById('loadedCount').textContent=postTotal?`Showing ${count} of ${postTotal}`:`${count} loaded`;
  const recent=posts.slice().sort((a,b)=>(Date.parse(firstValue(b,['created_at','createdAt','published_at','date'])||0)||0)-(Date.parse(firstValue(a,['created_at','createdAt','published_at','date'])||0)||0)).slice(0,3);
  document.getElementById('recentPosts').innerHTML=recent.length?recent.map(row=>`<div class="recent-post"><strong>${escapeHtml(shortText(firstValue(row,['title','name','subject','content','body','text'])||'Community post',95))}</strong><p>${escapeHtml(shortText(firstValue(row,['excerpt','description','content','body','text'])||'Open this post in ScubaSwap to see the full details.',120))}</p><div class="recent-meta">${escapeHtml(firstValue(row,['author_name','username','author','user_name'])||'Community member')}${firstValue(row,['created_at','createdAt','published_at','date'])?' · '+escapeHtml(safeDate(firstValue(row,['created_at','createdAt','published_at','date']))):''}</div></div>`).join(''):`<div class="empty-state small"><span class="empty-icon">▤</span><strong>${state.connection?'No posts yet':'Your posts will show here'}</strong><p>${state.connection?'Your connected table has no rows yet.':'Connect Supabase to pull in the latest activity.'}</p></div>`;
}
function postCard(row) {
  const title=firstValue(row,['title','name','subject','headline']);
  const body=firstValue(row,['content','body','text','description','message','caption']);
  const author=firstValue(row,['author_name','username','user_name','author','display_name','full_name','email'])||'Community member';
  const date=firstValue(row,['created_at','createdAt','published_at','date','updated_at']);
  const tags=firstValue(row,['tags','category','type']);
  const used=new Set(['title','name','subject','headline','content','body','text','description','message','caption','author_name','username','user_name','author','display_name','full_name','email','created_at','createdAt','published_at','date','updated_at','tags','category','type','id','user_id']);
  const extra=Object.entries(row).filter(([key,val])=>!used.has(key)&&val!==null&&typeof val!=='object').slice(0,4);
  const displayTitle=title||shortText(body||'Community post',90);
  const displayBody=body&&body!==displayTitle?shortText(body,440):'';
  const tagList=Array.isArray(tags)?tags:String(tags||'').split(',').map(t=>t.trim()).filter(Boolean);
  const initials=author.split(/[\s@._-]/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()||'SS';
  return `<article class="post-card"><div class="post-card-head"><span class="post-avatar">${escapeHtml(initials)}</span><div class="post-author"><strong>${escapeHtml(author)}</strong><small>${escapeHtml(date?safeDate(date):'ScubaSwap post')}</small></div><span class="post-menu">···</span></div><h3 class="post-title">${escapeHtml(shortText(displayTitle,100))}</h3>${displayBody?`<div class="post-body">${escapeHtml(displayBody)}</div>`:''}${tagList.length?`<div class="post-tags">${tagList.slice(0,5).map(t=>`<span class="post-tag">${escapeHtml(t)}</span>`).join('')}</div>`:''}${extra.length?`<div class="post-fields">${extra.map(([k,v])=>`<div class="post-field"><b>${escapeHtml(k.replaceAll('_',' '))}:</b> ${escapeHtml(shortText(v,150))}</div>`).join('')}</div>`:''}</article>`;
}

function setView(name) {
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));
  document.getElementById(`view-${name}`).classList.add('active-view');
  document.querySelectorAll('.nav-item').forEach(btn=>btn.classList.toggle('active',btn.dataset.view===name));
  const labels={overview:'Overview',posts:'Posts',progress:'Progress',connection:'Supabase setup'};
  document.getElementById('crumbTitle').textContent=labels[name]||'Overview';
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>setView(btn.dataset.view)));
document.addEventListener('click',e=>{const target=e.target.closest('[data-goto]');if(target)setView(target.dataset.goto);});
document.getElementById('refreshBtn').addEventListener('click',refreshPosts);
document.getElementById('postsRefresh').addEventListener('click',refreshPosts);
document.getElementById('loadMorePosts').addEventListener('click',loadMorePosts);
document.getElementById('postSearch').addEventListener('input',renderPosts);
document.getElementById('postSort').addEventListener('change',renderPosts);
document.getElementById('toggleKey').addEventListener('click',()=>{const input=document.getElementById('anonKey');const show=input.type==='password';input.type=show?'text':'password';document.getElementById('toggleKey').textContent=show?'Hide':'Show';});

document.getElementById('connectionForm').addEventListener('submit',async e=>{
  e.preventDefault();showMessage('connectionError','');showMessage('connectionSuccess','');
  const url=document.getElementById('projectUrl').value.trim().replace(/\/$/,''),key=document.getElementById('anonKey').value.trim(),table=document.getElementById('tableName').value.trim();
  if(!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url)){showMessage('connectionError','Use your Supabase Project URL, like https://your-project.supabase.co.');return;}
  if(/service_role|sb_secret|secret[_-]?key/i.test(key)){showMessage('connectionError','That looks like a secret or service_role key. Use the publishable key or legacy anon key instead.');return;}
  if(!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)){showMessage('connectionError','Enter a table name using letters, numbers, and underscores.');return;}
  const btn=document.getElementById('connectButton');btn.disabled=true;btn.innerHTML='Testing connection…';
  try {
    const test=await fetch(`${url}/rest/v1/${encodeURIComponent(table)}?select=*&limit=1`,{headers:{apikey:key,Authorization:`Bearer ${authSession?.access_token||key}`,Accept:'application/json'}});
    if(!test.ok){const data=await test.json().catch(()=>({}));throw new Error(data.message||data.msg||`Supabase returned HTTP ${test.status}. Check the table name, key, and Row Level Security permissions.`);}
    const conn={url,key,table};
    state.connection=conn;saveState();const page=await fetchPosts(0);posts=page.rows;postHasMore=page.hasMore;postTotal=page.total;render();showMessage('connectionSuccess',`Connected. ${posts.length?'Loaded posts from':'The connection works; no posts were returned from'} “${table}”.`,'success');toast('Supabase connected');
  } catch(err) {showMessage('connectionError',friendlyError(err));}
  finally {btn.disabled=false;btn.innerHTML='Test connection &amp; save <span>→</span>';}
});
function friendlyError(error) {
  const msg=error?.message||'Could not reach Supabase.';
  if(msg.includes('Failed to fetch')||msg.includes('NetworkError'))return 'Could not reach this project. Check the URL, network access, and that your Supabase project is active.';
  if(/permission|row level|policy|JWT|auth/i.test(msg))return `${msg} If this table requires a signed-in admin, use the Supabase Auth sign-in below. Otherwise check the table’s SELECT policy.`;
  if(/does not exist|schema cache|PGRST205|PGRST204/i.test(msg))return `Table “${document.getElementById('tableName').value}” was not found in the public schema. Check the name, or enter the correct table/view.`;
  return msg;
}
async function fetchPosts(offset=0) {
  if(!state.connection)return [];
  const {url,key,table}=state.connection;
  const pageSize=100;
  const response=await fetch(`${url}/rest/v1/${encodeURIComponent(table)}?select=*&limit=${pageSize}`,{headers:{apikey:key,Authorization:`Bearer ${authSession?.access_token||key}`,Accept:'application/json','Range-Unit':'items',Range:`${offset}-${offset+pageSize-1}`,Prefer:'count=exact'}});
  if(!response.ok){const data=await response.json().catch(()=>({}));throw new Error(data.message||data.msg||`Supabase returned HTTP ${response.status}.`);}
  const data=await response.json();if(!Array.isArray(data))throw new Error('Supabase returned an unexpected result. Make sure the table is exposed through the Data API.');
  const totalMatch=(response.headers.get('content-range')||'').match(/\/(\d+)$/),total=totalMatch?Number(totalMatch[1]):null;
  return {rows:data,total,hasMore:total!==null?offset+data.length<total:data.length===pageSize};
}
async function refreshPosts() {
  if(!state.connection){setView('connection');return;}
  const btn=document.getElementById('postsRefresh');btn.disabled=true;btn.innerHTML='Loading…';
  try {const page=await fetchPosts(0);posts=page.rows;postHasMore=page.hasMore;postTotal=page.total;renderPosts();toast(`Loaded ${posts.length} post${posts.length===1?'':'s'}`);}
  catch(error){toast(friendlyError(error));}
  finally {btn.disabled=false;btn.innerHTML='↻ <span>Refresh posts</span>';}
}
async function loadMorePosts() {
  const button=document.getElementById('loadMorePosts');button.disabled=true;button.textContent='Loading…';
  try {const page=await fetchPosts(posts.length);posts=posts.concat(page.rows);postHasMore=page.hasMore;postTotal=page.total;renderPosts();}
  catch(error){toast(friendlyError(error));}
  finally {button.disabled=false;button.innerHTML='Load more posts <span>↓</span>';}
}
document.getElementById('authForm').addEventListener('submit',async e=>{
  e.preventDefault();showMessage('authError','');
  if(!state.connection){showMessage('authError','Connect your Supabase project first, then sign in.');return;}
  const email=document.getElementById('adminEmail').value.trim(),password=document.getElementById('adminPassword').value;
  if(!email||!password){showMessage('authError','Enter your Supabase Auth email and password.');return;}
  const button=document.getElementById('authButton');button.disabled=true;button.textContent='Signing in…';
  try {
    const response=await fetch(`${state.connection.url}/auth/v1/token?grant_type=password`,{method:'POST',headers:{apikey:state.connection.key,'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.msg||data.message||data.error_description||'Supabase sign-in failed.');
    saveSession({access_token:data.access_token,refresh_token:data.refresh_token,expires_at:Date.now()+(data.expires_in||3600)*1000});
    const page=await fetchPosts(0);posts=page.rows;postHasMore=page.hasMore;postTotal=page.total;render();showMessage('connectionSuccess','Signed in. Posts are now loading with your Supabase user permissions.','success');toast('Signed in to Supabase');
  } catch(error){showMessage('authError',friendlyError(error));}
  finally{button.disabled=false;button.innerHTML='Sign in to Supabase <span>→</span>';}
});
document.getElementById('signOut').addEventListener('click',()=>{saveSession(null);posts=[];render();toast('Signed out of Supabase');});
document.getElementById('addMilestone').addEventListener('click',()=>{
  const title=window.prompt('Milestone name');if(!title?.trim())return;
  const detail=window.prompt('What does this milestone cover?')||'';state.milestones.push({title:title.trim(),detail,status:'Planned'});saveState();renderProgress();toast('Milestone added');
});
document.getElementById('saveStatus').addEventListener('click',()=>{state.status=document.getElementById('projectStatusSelect').value;saveState();renderProgress();toast('Project status updated');});

async function boot() {
  render();
  if(state.connection) {
    try {
      if(authSession?.expires_at && authSession.expires_at<Date.now() && authSession.refresh_token) await refreshAuthToken();
      const page=await fetchPosts(0);posts=page.rows;postHasMore=page.hasMore;postTotal=page.total;render();
    } catch(error){showMessage('connectionError',friendlyError(error));}
  }
}
async function refreshAuthToken() {
  const response=await fetch(`${state.connection.url}/auth/v1/token?grant_type=refresh_token`,{method:'POST',headers:{apikey:state.connection.key,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:authSession.refresh_token})});
  const data=await response.json().catch(()=>({}));if(!response.ok){saveSession(null);return;}
  saveSession({access_token:data.access_token,refresh_token:data.refresh_token,expires_at:Date.now()+(data.expires_in||3600)*1000});
}
boot();
