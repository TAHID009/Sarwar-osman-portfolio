/* Work performance snapshot (home page).
   Reads ONE public document per month, publicSummary/YYYY-MM, which only the site owner can write (see firestore.rules).
   Nothing is hard-coded: if no document exists the section stays hidden. Sample numbers appear only with ?demo. */
(function(){
'use strict';
var sec=document.getElementById('snapshot');if(!sec)return;
var PROJECT='my-work-records',TZ='Asia/Dhaka';
var DEMO=/[?&]demo(=|&|$)/.test(location.search);
function $(i){return document.getElementById(i)}
function ymd(d){return new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).format(d)}
function shift(k,n){var p=k.split('-'),d=new Date(Date.UTC(+p[0],+p[1]-1+n,1));return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0')}
function monthName(k){var p=k.split('-');return new Date(Date.UTC(+p[0],+p[1]-1,1)).toLocaleString('en-GB',{month:'long',year:'numeric',timeZone:'UTC'})}
function dateName(s){return new Date(s+'T00:00:00Z').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'})}
function unwrap(v){if(!v)return null;if('integerValue' in v)return Number(v.integerValue);if('doubleValue' in v)return Number(v.doubleValue);if('stringValue' in v)return v.stringValue;if('booleanValue' in v)return v.booleanValue;if('nullValue' in v)return null;
 if('mapValue' in v){var o={},f=v.mapValue.fields||{};Object.keys(f).forEach(function(k){o[k]=unwrap(f[k])});return o}return null}
function fetchDoc(k){return fetch('https://firestore.googleapis.com/v1/projects/'+PROJECT+'/databases/(default)/documents/publicSummary/'+k).then(function(r){if(!r.ok)return null;return r.json()}).then(function(j){if(!j||!j.fields)return null;var o={};Object.keys(j.fields).forEach(function(k){o[k]=unwrap(j.fields[k])});return o}).catch(function(){return null})}
function ok(d,k){return d&&d.selfRecorded===true&&d.period===k&&typeof d.total==='number'&&typeof d.completed==='number'&&typeof d.open==='number'&&d.categories&&typeof d.categories==='object'}
function demoDoc(k){return{period:k,inProgress:false,selfRecorded:true,updated:ymd(new Date()),total:128,completed:104,pending:9,followUp:15,open:24,activeDays:21,completionRate:81.3,avgPerActiveDay:6.1,prevTotal:112,workloadChange:14.3,categories:{'Ticketing':38,'Fare Query':27,'Booking Support':21,'Reissue':17,'Refund':12,'Other':13},effort:{Quick:44,Standard:69,Deep:15},transactions:{Ticketing:38,Reissue:17,Refund:12,Other:6}}}
function setText(id,t){var e=$(id);if(e)e.textContent=t}
function num(v,s){return v==null?'n/a':String(v)+(s||'')}
function card(label,value,trend){var li=document.createElement('li'),a=document.createElement('p'),b=document.createElement('p');a.className='snap-cl';b.className='snap-cv';a.textContent=label;b.textContent=value;li.appendChild(a);li.appendChild(b);if(trend){var t=document.createElement('p');t.className='snap-ct';t.textContent=trend;li.appendChild(t)}return li}
function trendText(c){if(c==null)return 'n/a';var a=Math.abs(c);return (c>0?'▲ Up ':c<0?'▼ Down ':'► Same ')+(c===0?'':a+'%')+' on last month'}
function show(d,cur){
 sec.hidden=false;
 setText('snap-period',monthName(d.period)+(d.inProgress?' (in progress)':'')+' · Updated '+dateName(d.updated)+(DEMO?' · Sample data (preview mode)':''));
 var rate=d.completionRate,bar=$('snap-bar'),pb=$('snap-pb');
 setText('snap-rate',rate==null?'n/a':rate+'%');
 var w=rate==null?0:Math.max(0,Math.min(100,rate));pb.setAttribute('aria-valuenow',String(w));
 var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduce){bar.style.transition='none';bar.style.width=w+'%'}else{requestAnimationFrame(function(){requestAnimationFrame(function(){bar.style.width=w+'%'})})}
 setText('snap-sub',d.completed+' of '+d.total+' activities completed');
 var ul=$('snap-cards');ul.textContent='';
 ul.appendChild(card('Activities handled',String(d.total)));
 ul.appendChild(card('Workload vs last month',d.workloadChange==null?'n/a':(d.workloadChange>0?'+':'')+d.workloadChange+'%',trendText(d.workloadChange)));
 ul.appendChild(card('Average per active day',num(d.avgPerActiveDay)));
 ul.appendChild(card('Open items',String(d.open)));
 setText('snap-cur',cur&&cur.period!==d.period?'Current month in progress: '+cur.total+' activities so far.':'');
}
var cur=ymd(new Date()).slice(0,7),last=shift(cur,-1);
if(DEMO){show(demoDoc(last),null);return}
Promise.all([fetchDoc(last),fetchDoc(cur)]).then(function(r){var a=ok(r[0],last)?r[0]:null,b=ok(r[1],cur)?r[1]:null;var main=a||b;if(!main)return;show(main,b)});
})();
