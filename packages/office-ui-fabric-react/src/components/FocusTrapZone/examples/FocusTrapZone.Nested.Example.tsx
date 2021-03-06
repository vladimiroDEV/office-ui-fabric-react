import * as React from 'react';

/* tslint:disable:no-string-literal */

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import './FocusTrapZone.Box.Example.scss';

interface IFocusTrapComponentProps {
  name: string;
  isActive: boolean;
  setIsActive: (name: string, isActive: boolean) => void;
}

interface IFocusTrapComponentState {
}

class FocusTrapComponent extends React.Component<IFocusTrapComponentProps, IFocusTrapComponentState> {

  public render() {
    const contents = (
      <div className='ms-FocusTrapComponent'>
        <DefaultButton
          onClick={ this._onStringButtonClicked }
          text={ this.props.name }
        />
        <Toggle
          defaultChecked={ this.props.isActive }
          onChanged={ this._onFocusTrapZoneToggleChanged }
          label='Focus Trap Zone'
          onText='On'
          offText='Off'
        />
        {
          this.props.children
        }
      </div>
    );

    if (this.props.isActive) {
      return (
        <FocusTrapZone forceFocusInsideTrap={ false }>
          {
            contents
          }
        </FocusTrapZone>
      );
    }
    return contents;
  }

  private _onStringButtonClicked = (): void => {
    console.log(this.props.name);
  }

  private _onFocusTrapZoneToggleChanged = (isChecked: boolean): void => {
    this.props.setIsActive(this.props.name, isChecked);
  }

}

export interface IFocusTrapZoneNestedExampleState {
  stateMap: {
    [key: string]: boolean;
  };
}

const NAMES: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];

export default class FocusTrapZoneNestedExample extends React.Component<{}, IFocusTrapZoneNestedExampleState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      stateMap: {}
    };
  }

  public render() {
    const { stateMap } = this.state;

    return (
      <div>
        <FocusTrapComponent name={ 'One' } isActive={ !!stateMap['One'] } setIsActive={ this._setIsActive } >
          <FocusTrapComponent name={ 'Two' } isActive={ !!stateMap['Two'] } setIsActive={ this._setIsActive } >
            <FocusTrapComponent name={ 'Three' } isActive={ !!stateMap['Three'] } setIsActive={ this._setIsActive } />
            <FocusTrapComponent name={ 'Four' } isActive={ !!stateMap['Four'] } setIsActive={ this._setIsActive } />
          </FocusTrapComponent>
          <FocusTrapComponent name={ 'Five' } isActive={ !!stateMap['Five'] } setIsActive={ this._setIsActive } />
        </FocusTrapComponent>
        <DefaultButton onClick={ this._randomize }>Randomize</DefaultButton>
      </div>
    );
  }

  private _setIsActive = (name: string, isActive: boolean): void => {
    this.state.stateMap[name] = isActive;
    this.forceUpdate();
  }

  private _randomize = (): void => {
    NAMES.forEach((name) => {
      this.state.stateMap[name] = Math.random() >= .5;
    });

    this.forceUpdate();
  }

}
