/**
 * quasar
 *
 * Copyright (c) 2015 Glipcode http://glipcode.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions
 * of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import LoadingDialogComponent from './loading-dialog.component';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import sinon from 'sinon';

describe('Component: LoadingDialogComponent', () => {
  const test = 'test title';
  class ContainerComponent extends React.Component {
    constructor() {
      super(...arguments);

      this.constructor.childContextTypes = {
        muiTheme: React.PropTypes.object,
      };
    }
    getChildContext() {
      return {
        muiTheme: getMuiTheme(lightBaseTheme),
      };
    }

    render() {
      return (
        <LoadingDialogComponent {...this.props}/>
      );
    }
  }

  it('should render', () => {
    const el = shallow(<LoadingDialogComponent title={test}/>);
    chai.assert.equal(el.find('h4').text(), test, 'title not set properly');
  });

  it('should not rerender unless props/state change', () => {
    let renderSpy = sinon.spy(LoadingDialogComponent.prototype, 'render');
    const el = mount(
      <ContainerComponent title={test}/>
    );
    chai.assert(renderSpy.callCount, 1);
    el.setProps({title: 'test title'});
    chai.assert(renderSpy.callCount, 1);
    el.setProps({title: 'test title2'});
    chai.assert(renderSpy.callCount, 2);
  });
});