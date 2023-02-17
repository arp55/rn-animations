// @flow
import * as React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

import StoryThumbnail from './StoryThumbnail';
import type {Story} from './StoryModel';
import StoryModal from './StoryModal';

type DiscoveryProps = {
  stories: Story[],
};

type DiscoveryState = {
  selectedStory: Story | null,
  position: Position | null,
};

export default class Discovery extends React.PureComponent<
  DiscoveryProps,
  DiscoveryState,
> {
  state = {
    selectedStory: null,
    position: null,
  };

  constructor(props) {
    super(props);
    this.thumbnails = props.stories.map(() => React.createRef());
  }

  setSelected = async (story: Story, index) => {
    console.log('thumbnails', this.thumbnails);
    const position = await this.thumbnails[index].current.measure();
    this.setState({selectedStory: story, position});
  };

  onRequestClose = () => {
    this.setState({
      position: null,
      selectedStory: null,
    });
  };

  render() {
    const {stories} = this.props;
    const {setSelected, thumbnails, onRequestClose} = this;
    const {selectedStory, position} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <SafeAreaView
            style={styles.content}
            contentInsetAdjustmentBehavior="automatic">
            {stories.map((story, index) => (
              <StoryThumbnail
                ref={thumbnails[index]}
                key={story.id}
                {...{story}}
                onPress={() => setSelected(story, index)}
                selected={selectedStory && selectedStory.id === story.id}
              />
            ))}
          </SafeAreaView>
        </ScrollView>
        {selectedStory && (
          <StoryModal story={selectedStory} {...{position, onRequestClose}} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});
