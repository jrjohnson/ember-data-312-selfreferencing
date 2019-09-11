import DS from 'ember-data';
import { computed } from '@ember/object';
const { attr, belongsTo, hasMany, Model } = DS;

export default Model.extend({
  title: attr('string'),
  parent: belongsTo('learner-group', { async: true, inverse: 'children' }),
  children: hasMany('learner-group', { async: true, inverse: 'parent' }),

  allParents: computed('parent', 'parent.allParents.[]', async function(){
    const parent = await this.get('parent');
    if (!parent) {
      return [];
    }
    const allParents = await parent.get('allParents');

    return [parent].concat(allParents);
  }),

  allParentsDifferent: computed('parent', async function(){
    const parent = await this.get('parent');
    if (!parent) {
      return [];
    }
    const allParents = await parent.get('allParents');

    return [parent].concat(allParents);
  }),
});
