import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | learner group', function(hooks) {
  setupTest(hooks);

  test('check all parents one level', async function(assert) {
    assert.expect(2);
    const store = this.owner.lookup('service:store');
    const learnerGroup = store.createRecord('learner-group', { });

    const subGroup1 = store.createRecord('learner-group', { parent: learnerGroup });
    const subGroup2 = store.createRecord('learner-group', { parent: subGroup1 });

    const allParents = await subGroup2.get('allParents');
    assert.ok(allParents.includes(learnerGroup));
    assert.ok(allParents.includes(subGroup1));
  });

  test('check all parents two levels', async function(assert) {
    assert.expect(3);
    const store = this.owner.lookup('service:store');
    const learnerGroup = store.createRecord('learner-group', { });

    const subGroup1 = store.createRecord('learner-group', { parent: learnerGroup });
    const subGroup2 = store.createRecord('learner-group', { parent: subGroup1 });
    const subGroup3 = store.createRecord('learner-group', { parent: subGroup2 });

    const allParents = await subGroup3.get('allParents');
    assert.ok(allParents.includes(learnerGroup));
    assert.ok(allParents.includes(subGroup1));
    assert.ok(allParents.includes(subGroup2));
  });

  test('check all parents different two levels', async function(assert) {
    assert.expect(3);
    const store = this.owner.lookup('service:store');
    const learnerGroup = store.createRecord('learner-group', { });

    const subGroup1 = store.createRecord('learner-group', { parent: learnerGroup });
    const subGroup2 = store.createRecord('learner-group', { parent: subGroup1 });
    const subGroup3 = store.createRecord('learner-group', { parent: subGroup2 });

    const allParents = await subGroup3.get('allParentsDifferent');
    assert.ok(allParents.includes(learnerGroup));
    assert.ok(allParents.includes(subGroup1));
    assert.ok(allParents.includes(subGroup2));
  });
});
