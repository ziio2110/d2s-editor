import Item from './Item.js';
import ItemStatsEditor from './ItemStatsEditor.js';

import html from '../../html.js';

export default {
  template: html`
  <div>
    <div class="form-row">
      <div class="col-md-12">
        <button type="button" class="btn btn-primary" @click="onEvent('share')">Share</button>
        <button type="button" class="btn btn-primary" @click="onEvent('copy')">Copy</button>
        <span v-if="item.location_id != 6">
          <button type="button" class="btn btn-danger" @click="onEvent('delete')">Delete</button>
        </span>
      </div>
    </div>
    
    <div></div>
    <div class="form-row">
      <div></div>
      <div><Item :item.sync="item" clazz="item-edit"></Item></div>
      
      <ul className="d2p-ItemOptions">
        <span v-if="!item.simple_item">
          <li>
            <label :for="id + 'Rarity'">Rarity</label>
            <select class="form-control" :id="id + 'Rarity'" v-model.number="item.quality" @change="onEvent('update')">
              <option v-for="rarity in rarities" :value="rarity.key" :key="rarity.key">{{rarity.value}}</option>
            </select>
          </li>
          <li>
            <div class="form-row" v-if="item.quality == 4">
              <div class="col-md-6">
                <label :for="id + 'Prefix'">Prefix</label>
                <select class="form-control" :id="id + 'Prefix'" v-model.number="item.magic_prefix_name" @change="onEvent('update')">
                  <option value="0">None</option>
                  <option v-for="s in prefixes" :value="s.v.n" :key="s.i">{{s.v.n}}</option>
                </select>
              </div>
              <div class="col-md-6">
                <label :for="id + 'Suffix'">Suffix</label>
                <select class="form-control" :id="id + 'Suffix'" v-model.number="item.magic_suffix_name" @change="onEvent('update')">
                  <option value="0">None</option>
                  <option v-for="s in suffixes" :value="s.v.n" :key="s.i">{{s.v.n}}</option>
                </select>
              </div>
            </div>
            <div class="form-row" v-if="item.quality == 6 || item.quality == 8">
              <div class="col-md-6">
                <label :for="id + 'RareName1'">Rare Name 1</label>
                <select class="form-control" :id="id + 'RareName1'" v-model.number="item.rare_name" @change="onEvent('update')">
                  <option v-for="s in rare_names" :value="s.v.n" :key="s.i">{{s.v.n}}</option>
                </select>
              </div>
              <div class="col-md-6">
                <label :for="id + 'RareName2'">Rare Name 2</label>
                <select class="form-control" :id="id + 'RareName2'" v-model.number="item.rare_name2" @change="onEvent('update')">
                  <option v-for="s in rare_names" :value="s.v.n" :key="s.i">{{s.v.n}}</option>
                </select>
              </div>
            </div>
          </li>  
          <li>
            <div v-if="item.quality == 5">
              <label :for="id + 'SetName'">Set Name</label>
              <select class="form-control" :id="id + 'SetName'" v-model.number="item.set_id" @change="onEvent('update')">
                <option v-for="s in set_items" :value="s.i" :key="s.i">{{s.v.n}}</option>
              </select>
            </div>
          </li>
          <li>
            <label for="id + 'ILvl'">Item Level</label>
            <input type="number" class="form-control" :id="id + 'ILvl'" v-model.number="item.level" @input="onEvent('update')">
          </li>
        </span>

        <li>
          <label for="id + 'Base'">Base</label>
          <select class="form-control" :id="id + 'Base'" v-model="item.type" @change="onEvent('update')"> 
            <option v-for="s in basesByType(item.type)" :value="s[0]" :key="s[0]">{{s[1].n}}</option>
          </select>
        </li>

        <span v-if="!item.simple_item">
          <li>
            <div v-if="item.defense_rating">
              <label :for="id + 'Def'">Defense</label>
              <input type="number" class="form-control" :id="id + 'Def'" v-model.number="item.defense_rating" @input="onEvent('update')">
            </div>
          </li>
          <li>
            <div v-if="item.socketed">
              <label :for="id + 'Sockets'">Sockets</label>
              <input type="number" class="form-control" :id="id + 'Sockets'" v-model.number="item.total_nr_of_sockets" @input="onEvent('update')">
            </div>
          </li>
          <li>
            <div class="form-check form-check-inline">
              <label class="form-check-label"><input class="form-check-input" type="checkbox"
                v-model.number="item.socketed" :true-value="1" :false-value="0">Socketed</label>
            </div>
          </li>
          <li>
            <div class="form-check form-check-inline">
              <label class="form-check-label"><input class="form-check-input" type="checkbox"
                v-model.number="item.ethereal" :true-value="1" :false-value="0" @change="onEvent('update')">Ethereal</label>
            </div>
          </li>
          <li>
            <div class="form-check form-check-inline">
              <label class="form-check-label"><input class="form-check-input" type="checkbox"
                v-model.number="item.personalized" :true-value="1" :false-value="0" @change="onEvent('update')">Personalized</label>
            </div>
          </li>
          <li>
            <div v-if="item.personalized">
              <label :for="id + 'PersonalName'">Personalized Name</label>
              <input type="text" class="form-control" :id="id + 'PersonalName'" v-model="item.personalized_name" @input="onEvent('update')">
            </div>
          </li>
        </span>
      </ul>    
    </div>  

    <span v-if="!item.simple_item">
      <div v-if="item.magic_attributes">
        <div>Item Stats</div>
        <ItemStatsEditor :item-stats.sync="item.magic_attributes" :id="id + 'Magic'" @stat-change="onEvent('update')"></ItemStatsEditor>
      </div>
      <div v-if="item.runeword_attributes">
        <div>Runeword Stats</div>
        <ItemStatsEditor :item-stats.sync="item.runeword_attributes" :id="id + 'Runeword'" @stat-change="onEvent('update')"></ItemStatsEditor>
      </div>
      <div v-if="item.set_attributes">
        <div v-for="(set_attribute, index) in item.set_attributes">
          <div>Set Stats List {{index}}</div>
          <ItemStatsEditor :item-stats.sync="set_attribute" :id="id + 'Set' + index" @stat-change="onEvent('update')"></ItemStatsEditor>
        </div>
      </div>
      <div v-if="item.socketed_items">
        <div v-for="(socketed_item, index) in item.socketed_items">
          <ItemEditor ref="itemEditor" :item.sync="socketed_item" :id="id + 'Socketed' + index" @item-event="onChildEvent"></ItemEditor>
        </div>
      </div>
    </span>
</div>
`,
name: 'ItemEditor',
props: {
  id: String,
  item: Object,
  location: Object,
},
components: {
  Item,
  ItemStatsEditor,
},
data() {
  return {
    rarities: [{ key: 1, value: 'Low' }, { key: 2, value: 'Normal' }, { key: 3, value: 'Superior' }, { key: 4, value: 'Magic' }, { key: 5, value: 'Set' }, { key: 6, value: 'Rare' }, { key: 7, value: 'Unique' }, { key: 8, value: 'Crafted' }],
    locations: [{ key: 0, value: 'Stored' }, { key: 1, value: 'Equipped' }, { key: 4, value: 'Cursor' }],
    equipped_locations: [{ key: 1, value: 'Head' }, { key: 2, value: 'Neck' }, { key: 3, value: 'Torso' }, { key: 4, value: 'Right Hand' }, { key: 5, value: 'Left Hand' }, { key: 6, value: 'Right Finger' }, { key: 7, value: 'Left Finger' }, { key: 8, value: 'Waist' }, { key: 9, value: 'Boots' }, { key: 10, value: 'Gloves' }, { key: 11, value: 'Alternate Right Hand' }, { key: 12, value: 'Alternate Left Hand' }],
    storage_pages: [{ key: 1, value: 'Inventory' }, { key: 4, value: 'Cube' }, { key: 5, value: 'Stash' }],
    prefixes: window.constants.constants.magic_prefixes.map((e,i)=> { return { i:i, v:e }}).filter(e => e.v != null && e.v.n != null),
    suffixes: window.constants.constants.magic_suffixes.map((e,i)=> { return { i:i, v:e }}).filter(e => e.v != null && e.v.n != null),
    rare_names: window.constants.constants.rare_names.map((e,i)=> { return { i:i, v:e }}).filter(e => e.v != null && e.v.n != null),
    unq_items: window.constants.constants.unq_items.map((e,i)=> { return { i:i, v:e }}).filter(e => e.v != null && e.v.n != null),
    set_items: window.constants.constants.set_items.map((e,i)=> { return { i:i, v:e }}).filter(e => e.v != null && e.v.n != null),
    armor_items: Object.entries(window.constants.constants.armor_items).filter(e => e[1].n != null),
    weapon_items: Object.entries(window.constants.constants.weapon_items).filter(e => e[1].n != null),
    other_items: Object.entries(window.constants.constants.other_items).filter(e => e[1].n != null),
  };
},
methods: {
  onEvent(type) {
    this.$emit('item-event', { item: this.item, type: type });
  },
  onChildEvent(e) {
    this.$emit('item-event', { item: e.item, type: e.type });
  },
  onMove() {
    this.$emit('item-event', { item: this.item, location: this.location, type: 'move' });
  },
  basesByType(type) {
    if (this.item.type_id == 3) {
      return this.weapon_items.filter(e => e[1].nc == type || e[1].exc == type || e[1].elc == type)
    } else if (this.item.type_id == 1) {
      return this.armor_items.filter(e => e[1].nc == type || e[1].exc == type || e[1].elc == type)
    } else if (this.item.type_id == 4) {
      return this.other_items
    } else {
      return []
    }
  }
}
};
