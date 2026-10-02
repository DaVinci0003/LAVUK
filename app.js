const $ = id => document.getElementById(id);
const KEY = "x-day-counter-v1";
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
let state = load();
function load(){try{return JSON.parse(localStorage.getItem(KEY)) || fresh()}catch{return fresh()}}
function fresh(){return {name:"X",count:0,best:0,total:0,lastDate:null,choice:null,history:[]}}
function save(){localStorage.setItem(KEY,JSON.stringify(state));render()}
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove("show"),2400)}
function render(){
  $("title").textContent = `${state.name} Gün Sayacı`;
  $("statusHeading").textContent = state.choice === "did" ? `Bugün ${state.name} yazdın.` : `Bugün ${state.name} yazmadın.`;
  $("statusSub").textContent = state.choice ? "Bugünkü seçimin kaydedildi." : "Bugün için henüz seçim yapmadın.";
  $("count").textContent = state.count;
  $("best").textContent = `${state.best} gün`;
  $("total").textContent = state.total;
  $("recordText").textContent = state.count ? `Güzel gidiyorsun. En uzun serin ${state.best} gün.` : "Yeni bir seri başlatabilirsin.";
  $("progress").style.width = `${Math.min(state.count/30*100,100)}%`;
  const chosen = state.lastDate === today() && !!state.choice;
  $("didNotButton").disabled = chosen;
  $("didButton").disabled = chosen;
  $("actionHint").textContent = chosen ? "Bugünkü seçimin tamamlandı. Yarın tekrar seçim yapabilirsin." : "Her gün yalnızca bir seçim yapabilirsin.";
  $("editOpen").disabled = chosen;
}
$("editOpen").addEventListener("click",()=>{
  if(state.lastDate===today()&&state.choice){showToast("İsmi değiştirmek için önce “Bugün yazdım” seçeneğiyle seriyi sıfırlamalısın.");return}
  $("targetName").value=state.name;
  $("settingsDialog").showModal();
});
$("settingsForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("targetName").value.trim();
  if(!name){showToast("Lütfen bir isim gir.");return}
  if(state.lastDate===today()&&state.choice){showToast("Bugünkü seçimden sonra isim değiştirilemez.");$("settingsDialog").close();return}
  state.name=name;save();$("settingsDialog").close();showToast("Hedef adı kaydedildi.");
});
$("didNotButton").addEventListener("click",()=>{
  if(state.lastDate===today()&&state.choice)return;
  state.count+=1;state.total+=1;state.best=Math.max(state.best,state.count);
  state.lastDate=today();state.choice="not-did";state.history.push({date:today(),choice:"not-did",count:state.count});
  save();showToast("Kaydedildi! Serin bir gün daha uzadı.");
});
$("didButton").addEventListener("click",()=>{
  if(state.lastDate===today()&&state.choice)return;
  if(!confirm(`“Bugün ${state.name} yazdım” seçeneği serini sıfırlayacak. Emin misin?`))return;
  state.count=0;state.lastDate=today();state.choice="did";state.history.push({date:today(),choice:"did",count:0});
  save();showToast("Tamamdır. Sayaç sıfırlandı; yarın yeniden başlayabilirsin.");
});
if("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("./sw.js").catch(()=>{});
render();